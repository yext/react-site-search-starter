import { useContext } from 'react';
import { FilterView, FilterViewContext } from '../context/FilterViewContext';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { ReactComponent as FiltersIcon } from '../icons/filters.svg';

interface ViewFiltersButtonCssClasses {
  container?: string,
  button?: string
}

const builtInCssClasses: ViewFiltersButtonCssClasses = { 
  container: 'flex-grow justify-end flex',
  button: 'p-1 mb-7'
}

interface Props {
  customCssClasses?: ViewFiltersButtonCssClasses,
  cssCompositionMethod?: CompositionMethod
}

interface Props {
}

export default function ViewFiltersButton({ customCssClasses, cssCompositionMethod }: Props): JSX.Element {
  const { setFilterView } = useContext(FilterViewContext);
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  return (
    <div className={cssClasses.container}>
      <button
        className={cssClasses.button}
        onClick={() => setFilterView(FilterView.Visible)}
      >
        <FiltersIcon />
      </button>
    </div>
  );
}