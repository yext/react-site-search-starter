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

  type HierarchicalFacetOption = DisplayableFacetOption & {
    numDividers: number,
    hierarchicalDisplayName: string
  };

  const facetOptions = facet.options.map(o => {
    const hierarchy = o.displayName.split(divider);
    const numDividers = hierarchy.length - 1;
    return {
      ...o,
      numDividers,
      hierarchicalDisplayName: hierarchy[numDividers]
    }
  });

  const selectedOptions = facetOptions.filter(o => o.selected);

  function renderUnselectedOption(option: DisplayableFacetOption) {
    return <HierarchicalFacetOption
      selected={false}
      displayName={option.displayName}
      handleClick={() => answersActions.setFacetOption(facet.fieldId, option, true)}
    />
  }

  if (selectedOptions.length === 0) {
    return <div className='flex flex-col items-start'>
      {facetOptions
        .filter(o => o.numDividers === 0)
        .map(renderUnselectedOption)
      }
    </div>;
  }

  // This assumes that only one hierarchical facet "path" is selected, which should always be the case.
  const deepestSelectedOption = [...selectedOptions].sort((a, b) => b.displayName.length - a.displayName.length)[0];

  const directFacetOptionChildren = facet.options.filter(o => {
    const numDividers = o.displayName.split(divider).length - 1;
    return numDividers !== currentNumDividers + 1 && o.displayName.includes(deepestSelectedOption.displayName);
  });

  return <div className='flex flex-col items-start'>
    {directFacetOptionChildren.map(o => {
      const displayName = o.displayName.split(divider).pop();
      return (
        <HierarchicalFacetOption
          selected={true}
          displayName={displayName}
          handleClick={() => answersActions.setFacetOption(facet.fieldId, o, true)}
          className='text-blue-500'
        />
      )
    })}
  </div>;
}

function HierarchicalFacetOption(props: {
  selected: boolean,
  displayName?: string,
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
