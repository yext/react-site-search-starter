import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { ReactComponent as CloseXIcon } from '../icons/x.svg';

interface CollapseFiltersButtonCssClasses {
  button?: string
}

const builtInCssClasses: CollapseFiltersButtonCssClasses = {
  button: 'w-5 h-5 p-1 self-end my-2'
}

interface Props {
  customCssClasses?: CollapseFiltersButtonCssClasses,
  cssCompositionMethod?: CompositionMethod,
  onClick?: () => void
}

export default function CollapseFiltersButton ({ onClick, customCssClasses, cssCompositionMethod }: Props) {
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  return (
    <button
      className={cssClasses.button}
      onClick={onClick}
    >
      <CloseXIcon />
    </button>
  );
}