import { useAnswersActions, useAnswersState, Filter, Matcher } from '@yext/answers-headless-react';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { isDuplicateFilter } from '../utils/filterutils';
import { FilterConfig } from './FilterDisplay';
import Filters, { FiltersCssClasses } from './Filters';

interface StaticFilterOption {
  fieldId: string,
  value: string | number | boolean,
  label: string
}

interface StaticFiltersProps {
  filterConfigs: FilterConfig[],
  customCssClasses?: StaticFiltersCssClasses,
  cssCompositionMethod?: CompositionMethod
}

interface StaticFiltersCssClasses extends FiltersCssClasses {};

export default function StaticFilters(props: StaticFiltersProps): JSX.Element {
  const answersActions = useAnswersActions();
  const { filterConfigs: staticFilterConfigs, customCssClasses, cssCompositionMethod } = props;

  const selectableFilters = useAnswersState(state =>  state.filters.static);
  const isOptionSelected = (option: StaticFilterOption): boolean => {
    const foundFilter = selectableFilters?.find(storedSelectableFilter => {
      const { selected, ...storedFilter } = storedSelectableFilter;
      const targetFilter = {
        fieldId: option.fieldId,
        matcher: Matcher.Equals,
        value: option.value
      };
      return isDuplicateFilter(storedFilter, targetFilter); 
    });
    return !!foundFilter && foundFilter.selected;
  };

  const handleFilterOptionClick = (option: Filter, isChecked: boolean) => {
    answersActions.resetFacets();
    answersActions.setFilterOption({ ...option, selected: isChecked });
    answersActions.executeVerticalQuery();
  }

  const filterConfigs: FilterConfig[] = staticFilterConfigs.map(staticFilterConfig => {
    const filterOptions = staticFilterConfig.options.map(staticFilterOption => {
      return {
        ...staticFilterOption,
        onClick: handleFilterOptionClick,
        isSelected: isOptionSelected(staticFilterOption)
      }
    })
    return {
      ...staticFilterConfig,
      options: filterOptions,
    }
  })

  return (
    <Filters
      filterConfigs={filterConfigs}
      customCssClasses={customCssClasses}
      cssCompositionMethod={cssCompositionMethod}
    />
  );
}

interface DividerProps {
  customCssClasses?: {
    divider?: string
  },
  cssCompositionMethod?: CompositionMethod
}

export function Divider({ customCssClasses, cssCompositionMethod }: DividerProps) {
  const builtInCssClasses = {
    divider: 'w-full h-px bg-gray-200 my-4'
  }
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  return <div className={cssClasses.divider}></div>
}