import { useContext } from "react";
import { PageView, PageViewContext } from "../context/PageViewContext";
import { CompositionMethod, useComposedCssClasses } from "../hooks/useComposedCssClasses";
import { ReactComponent as CloseXIcon } from '../icons/x.svg';
import { Filters } from '@yext/answers-react-components';

interface FilterDisplayManagerCssClasses {
  container___desktop?: string,
  container___mobileFiltersExpanded?: string,
  collapseFiltersButton?: string
}

const builtInCssClasses: FilterDisplayManagerCssClasses = {
  container___desktop: 'mr-10',
  container___mobileFiltersExpanded: 'py-5 px-4 flex flex-col overflow-x-hidden fixed bg-white inset-0 z-10',
  collapseFiltersButton: 'w-5 h-5 p-1 self-end my-2'
}

interface Props {
  customCssClasses?: FilterDisplayManagerCssClasses,
  cssCompositionMethod?: CompositionMethod
};

/**
 * Responsible for managing how filters are displayed based on the current PageView
 */
export default function FilterDisplayManager({
  children,
  customCssClasses,
  cssCompositionMethod
}: React.PropsWithChildren<Props>) {
  const { pageView, setPageView } = useContext(PageViewContext);
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);

  if (pageView === PageView.Desktop) {
    return <div className={cssClasses.container___desktop}>{children}</div>;
  } else if (pageView === PageView.FiltersVisibleMobile) {
    return (
      <div className={cssClasses.container___mobileFiltersExpanded}>
        <button
          className={cssClasses.collapseFiltersButton}
          onClick={() => setPageView(PageView.FiltersHiddenMobile)}
        >
          <CloseXIcon />
        </button>
        <Filters.ResponsiveDivider/>
        {children}
      </div>
    );
  }
  return null;
}