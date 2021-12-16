import { useAnswersState, useAnswersActions, DisplayableFacetOption } from '@yext/answers-headless-react'
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import Facet,{ OverridableFacetConfig } from './Facet';
import { Divider } from './StaticFilters';


interface FacetsProps {
  searchOnChange?: boolean,
  searchable?: boolean,
  collapsible?: boolean,
  defaultExpanded?: boolean,
  facetConfigs?: Record<string, OverridableFacetConfig>,
  customCssClasses?: FacetsCssClasses,
  cssCompositionMethod?: CompositionMethod
}

interface FacetsCssClasses {
  container?: string,
  divider?: string
}

const builtInCssClasses: FacetsCssClasses = {
  container: 'md:w-40'
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
            onToggle={handleFacetOptionChange} />
          {!isLastFacet && <Divider customCssClasses={{ divider: cssClasses.divider }}/>}
        </div>
      );
    });

  return (
    <div className={cssClasses.container}>
      <div>
        {facetComponents}
      </div>
      <div>
        {!searchOnChange && <button onClick={executeSearch}>Apply</button>}
        <button onClick={handleResetFacets}>Reset all</button>
      </div>
    </div>
  )
}
