import { useAnswersState, useAnswersActions, DisplayableFacetOption } from '@yext/answers-headless-react'
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import Facet,{ FacetConfig, FacetCssClasses } from './Facet';
import { Divider } from './StaticFilters';


interface FacetsProps {
  searchOnChange?: boolean,
  searchable?: boolean,
  collapsible?: boolean,
  defaultExpanded?: boolean,
  facetConfigs?: Record<string, FacetConfig>,
  customCssClasses?: FacetsCssClasses,
  cssCompositionMethod?: CompositionMethod
}

interface FacetsCssClasses extends FacetCssClasses {
  container?: string,
  divider?: string,
  buttonsContainer?: string,
  button?: string
}

const builtInCssClasses: FacetsCssClasses = {
  searchableInputElement: 'text-sm bg-white h-9 w-full outline-none p-2 mb-2 rounded-md border border-gray-300 focus:border-blue-600',
  container: 'md:w-40',
  buttonsContainer: 'flex justify-between mt-5',
  button: 'border border-gray-300 px-2.5 py-1 rounded-md',
  divider: 'w-full h-px bg-gray-200 my-4'
}

export default function Facets (props: FacetsProps): JSX.Element {
  const { 
    searchOnChange,
    searchable,
    collapsible,
    defaultExpanded,
    facetConfigs = {},
    customCssClasses,
    cssCompositionMethod
  } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  const facets = useAnswersState(state => state.filters?.facets) || [];

  const answersActions = useAnswersActions();
  const executeSearch = () => answersActions.executeVerticalQuery();

  const handleResetFacets = () => {
    answersActions.resetFacets();
    if (searchOnChange) { 
      executeSearch();
    }
  }

  const handleFacetOptionChange = (fieldId: string, option: DisplayableFacetOption) => {
    answersActions.setFacetOption(fieldId, option, !option.selected);
    if (searchOnChange) { 
      executeSearch();
    }
  }

  const facetComponents = facets
    .filter(facet => facet.options?.length > 0)
    .map((facet, index, facetArray) => {
      const isLastFacet = index === facetArray.length -1;
      const overrideConfig = facetConfigs?.[facet.fieldId] ?? {};
      const config = {
        searchable,
        collapsible,
        defaultExpanded,
        ...overrideConfig
      }
      return (
        <div key={facet.fieldId}>
          <Facet
            facet={facet}
            {...config}
            customCssclasses={cssClasses}
            onToggle={handleFacetOptionChange} />
          {!isLastFacet && <Divider customCssClasses={{ divider: cssClasses.divider }} cssCompositionMethod='replace'/>}
        </div>
      );
    });

  return (
    <div className={cssClasses.container}>
      <div>
        {facetComponents}
      </div>
      <div className={cssClasses.buttonsContainer}>
        {!searchOnChange && <button onClick={executeSearch} className={cssClasses.button}>Apply</button>}
        <button onClick={handleResetFacets} className={cssClasses.button}>Reset all</button>
      </div>
    </div>
  )
}
