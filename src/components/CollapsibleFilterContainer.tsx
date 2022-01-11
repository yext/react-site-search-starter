import { cloneElement, ReactElement } from "react";
import { CompositionMethod, useComposedCssClasses } from "../hooks/useComposedCssClasses";
import { PageView } from "../hooks/usePageView";
import { ReactComponent as CloseXIcon } from '../icons/x.svg';
import Facets from "./Facets";
import StaticFilters, { Divider } from "./StaticFilters";
import recursivelyMapChildren from "./utils/recursivelyMapChildren";

interface CollapsibleFilterContainerCssClasses {
  container___desktop?: string,
  container___mobileFiltersExpanded?: string,
  divider?: string,
  collapseFiltersButton?: string
}

const builtInCssClasses: CollapsibleFilterContainerCssClasses = {
  container___desktop: 'mr-10',
  container___mobileFiltersExpanded: 'py-5 px-4 flex flex-col overflow-x-hidden fixed bg-white inset-0 z-10',
  divider: 'w-screen relative right-4 border-t border-gray-200 my-4',
  collapseFiltersButton: 'w-5 h-5 p-1 self-end my-2'
}

interface Props {
  customCssClasses?: CollapsibleFilterContainerCssClasses,
  cssCompositionMethod?: CompositionMethod,
  pageView: PageView,
  setPageView: (pageView: PageView) => void
};

/**
 * Responsible for managing the CollapsibleFilterContainer based on the current PageView
 */
export default function CollapsibleFilterContainer({
  children,
  pageView,
  setPageView,
  customCssClasses,
  cssCompositionMethod
}: React.PropsWithChildren<Props>) {
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  if (pageView === PageView.Desktop) {
    return <div className={cssClasses.container___desktop}>{children}</div>;
  } else if (pageView === PageView.MobileFiltersExpanded) {
    const childrenWithUpdatedDividers = recursivelyMapChildren(children, child => {
      if (child.type !== Facets && child.type !== StaticFilters && child.type !== Divider ) {
        return child;
      }
      return customizeComponentDivider(child, cssClasses.divider);
    });
    return (
      <div className={cssClasses.container___mobileFiltersExpanded}>
        <button
          className={cssClasses.collapseFiltersButton}
          onClick={() => setPageView(PageView.MobileFiltersCollapsed)}
        >
          <CloseXIcon />
        </button>
        <Divider customCssClasses={{ divider: cssClasses.divider }} cssCompositionMethod='assign'/>
        {childrenWithUpdatedDividers}
      </div>
    );
  }
  return null;
}

/**
 * Updates the divider of the component. Note, the cssCompositionMethod is overriden to be
 * 'assign', and any 'divider' styling supplied to the component is ignored
 */
function customizeComponentDivider(child: ReactElement, dividerCssClass?: string) {
  return cloneElement(child, {
    customCssClasses: { 
      ...child.props.customCssClasses,
      divider: dividerCssClass
    },
    cssCompositionMethod: 'assign'
  });
}