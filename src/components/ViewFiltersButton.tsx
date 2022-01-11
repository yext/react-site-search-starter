import { useContext } from 'react';
import { PageView, PageViewContext } from '../context/PageViewContext';
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

export default function ViewFiltersButton ({ customCssClasses, cssCompositionMethod }: Props) {
  const { setPageView } = useContext(PageViewContext);
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  return (
    <div className={cssClasses.container}>
      <button
        className={cssClasses.button}
        onClick={() => { setPageView(PageView.FiltersVisibleMobile)}}
      >
        <FiltersIcon />
      </button>
    </div>
  );
}