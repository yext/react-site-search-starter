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
  cssCompositionMethod?: CompositionMethod,
  onClick?: () => void
}

interface Props {
  onClick?: () => void
}

export default function ViewFiltersButton ({ onClick, customCssClasses, cssCompositionMethod }: Props) {
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  return (
    <div className={cssClasses.container}>
      <button
        className={cssClasses.button}
        onClick={onClick}
      >
        <FiltersIcon />
      </button>
    </div>
  );
}