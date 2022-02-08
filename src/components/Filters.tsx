import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import FilterDisplay, { FilterConfig, FilterDisplayCssClasses } from './FilterDisplay';

export interface FiltersCssClasses extends FilterDisplayCssClasses {
  container?: string,
  divider?: string,
  buttonsContainer?: string,
  button?: string
}

const builtInCssClasses: FiltersCssClasses = {
  option: 'flex items-center space-x-3',
  optionInput: 'w-3.5 h-3.5 form-checkbox cursor-pointer border border-gray-300 rounded-sm text-blue-600 focus:ring-blue-500',
  optionLabel: 'text-gray-500 text-sm font-normal cursor-pointer',
  container: 'md:w-40',
  divider: 'w-full h-px bg-gray-200 my-4',
  buttonsContainer: 'flex justify-between mt-5',
  button: 'border border-gray-300 px-2.5 py-1 rounded-md',
  searchableInputElement: 'text-sm bg-white h-9 w-full outline-none p-2 mb-2 rounded-md border border-gray-300 focus:border-blue-600'
}

interface FiltersProps {
  filterConfigs: FilterConfig[],
  customCssClasses?: FiltersCssClasses,
  cssCompositionMethod?: CompositionMethod
}

export default function Filters(props: FiltersProps): JSX.Element {
  const { filterConfigs, customCssClasses, cssCompositionMethod } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);

  return (
    <div className={cssClasses.container}>
      {filterConfigs.map((filterConfig, index) => {
        const isLastfilter = index === filterConfigs.length - 1;
        return (
          <div key={`${filterConfig.label}-${index}`}>
            <FilterDisplay 
              {...filterConfig}
              customCssClasses={cssClasses}
              cssCompositionMethod={cssCompositionMethod}
            />
            {!isLastfilter && <Divider customCssClasses={{ divider: cssClasses.divider }} cssCompositionMethod='replace'/>}
          </div>
        );
      })}
    </div>
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
