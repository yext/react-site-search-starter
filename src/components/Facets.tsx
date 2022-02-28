import { DisplayableFacet, DisplayableFacetOption, Filter, Matcher, useAnswersActions } from '@yext/answers-headless-react';
import { Filters } from '@yext/answers-react-components';
import classNames from 'classnames';
import parseHierarchicalFacet, { HierarchicalFacetTree } from './utils/parseHierarchicalFacet';

const hierarchicalFacets = [
  'c_hierarchicalFacet'
]

export default function Facets(): JSX.Element {
  return (
    <Filters.Facets className='md:w-80'>
      {facets => facets.map((f, i) => {
        if (f.options.length === 0) {
          return null;
        }

        if (hierarchicalFacets.includes(f.fieldId)) {
          return <HierarchicalFacet facet={f} />;
        }
        return null;

        return (
          <Filters.FilterGroup key={f.fieldId}>
            <Filters.CollapsibleLabel label={f.displayName} />
            <Filters.CollapsibleSection>
              <Filters.SearchInput />
              {f.options.map(o =>
                <Filters.CheckboxOption
                  key={o.displayName}
                  value={o.value}
                  fieldId={f.fieldId}
                />
              )}
            </Filters.CollapsibleSection>
            {(i < facets.length - 1) && <Filters.ResponsiveDivider />}
          </Filters.FilterGroup>
        )
      })}
    </Filters.Facets>
  )
}

function HierarchicalFacet({ facet, divider = '>' }: {
  facet: DisplayableFacet,
  divider?: string
}) {
  const answersActions = useAnswersActions();
  const tree = parseHierarchicalFacet(facet, divider);

  function deselectAllOptions(tree: HierarchicalFacetTree) {
    Object.values(tree).forEach(n => {
      answersActions.setFacetOption(facet.fieldId, n.facetOption, false);
      deselectAllOptions(n.childTree);
    });
  }
  
  function renderTree() {
    let treePointer = tree;
    const renderedOptions = [];

    if (facet.options.find(o => o.selected)) {
      renderedOptions.push(
        <HierarchicalFacetOption
          displayName='All Categories /'
          handleClick={() => facet.options.filter(o => o.selected).forEach(o => answersActions.setFacetOption(facet.fieldId, o, false))}
        />
      )
    } else {
      renderedOptions.push(
        <HierarchicalFacetOption
          className='font-bold'
          displayName='All Categories'
        />
      )
    }
  
    while (treePointer) {
      const childNodes = Object.values(treePointer);
      const selectedChildNode = childNodes.find(n => n.selected);

      if (!selectedChildNode) {
        renderedOptions.push(...childNodes.map(n => <HierarchicalFacetOption
          selected={false}
          className='ml-4'
          displayName={n.lastDisplayNameToken}
          handleClick={() => {
            answersActions.setFacetOption(facet.fieldId, n.facetOption, true )}
          }
        />));
        break;
      }
      
      if (selectedChildNode.hasSelectedChild) {
        renderedOptions.push(
          <HierarchicalFacetOption
            selected
            displayName={selectedChildNode.lastDisplayNameToken + ' /'}
            handleClick={() => {
              deselectAllOptions(selectedChildNode.childTree);
            }}
          />
        )
      } else {
        renderedOptions.push(<HierarchicalFacetOption
          selected
          className='font-bold'
          displayName={selectedChildNode.lastDisplayNameToken}
          handleClick={() => answersActions.setFacetOption(facet.fieldId, selectedChildNode.facetOption, false )}
        />)
      }
      treePointer = selectedChildNode.childTree;
    }

    return renderedOptions;
  }

  return (
    <div className='flex flex-col items-start'>
      {renderTree()}
    </div>
  );
}

function HierarchicalFacetOption(props: {
  displayName: string,
  selected?: boolean,
  className?: string,
  handleClick?: (selected: boolean) => void
}) {
  const { selected, displayName, className, handleClick } = props;
  return (
    <button className={className} onClick={() => handleClick?.(!selected)}>
      {displayName}
    </button>
  )
}
