import { useContext } from "react";
import { PageView, PageViewContext } from "../context/PageViewContext";
import { CompositionMethod, useComposedCssClasses } from "../hooks/useComposedCssClasses";
import { ReactComponent as CloseIcon } from '../icons/x.svg';
import { ResponsiveDivider } from "./ResponsiveDivider";
import { FilterView, FilterViewContext } from "../context/FilterViewContext";

interface FilterDisplayManagerCssClasses {
  container___desktop?: string,
  container___mobileFiltersExpanded?: string,
  collapseFiltersButton?: string
}

const builtInCssClasses: FilterDisplayManagerCssClasses = {
  container___desktop: 'mr-10',
  container___mobileFiltersExpanded: 'py-5 px-4 flex flex-col overflow-x-hidden fixed bg-white inset-0 z-10',
  collapseFiltersButton: 'w-5 h-5 p-1 self-end my-2 text-gray-400'
}

interface Props {
  customCssClasses?: FilterDisplayManagerCssClasses,
  cssCompositionMethod?: CompositionMethod
};

/**
 * Responsible for managing how filters are displayed based on the current PageView and FilterView.
 */
export default function FilterDisplayManager({
  children,
  customCssClasses,
  cssCompositionMethod
}: React.PropsWithChildren<Props>): JSX.Element | null {
  const pageView = useContext(PageViewContext);
  const { filterView, setFilterView } = useContext(FilterViewContext);
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);

  if (pageView === PageView.Desktop) {
    return <div className={cssClasses.container___desktop}>{children}</div>;
  }
  if (pageView === PageView.Mobile && filterView === FilterView.Visible) {
    return (
      <div className={cssClasses.container___mobileFiltersExpanded}>
        <button
          className={cssClasses.collapseFiltersButton}
          onClick={() => setFilterView(FilterView.Hidden)}
        >
          <CloseIcon />
        </button>
        <ResponsiveDivider />
        {children}
      </div>
    );
  }
  return null;
}