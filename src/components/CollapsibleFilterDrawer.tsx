import { cloneElement, ReactElement } from "react";
import { CompositionMethod, useComposedCssClasses } from "../hooks/useComposedCssClasses";
import { PageView } from "../hooks/usePageView";
import CollapseFiltersButton from "./CollapseFiltersButton";
import Facets from "./Facets";
import StaticFilters, { Divider } from "./StaticFilters";
import recursivelyMapChildren from "./utils/recursivelyMapChildren";

interface CollapsibleFilterDrawerCssClasses {
  container___desktop?: string,
  container___mobileFiltersExpanded?: string,
  divider?: string
}

const builtInCssClasses: CollapsibleFilterDrawerCssClasses = {
  container___desktop: 'mr-10',
  container___mobileFiltersExpanded: 'py-5 px-4 flex flex-col overflow-x-hidden fixed bg-white inset-0 z-10',
  divider: 'w-screen right-4 border-t border-gray-200 my-4'
}

interface Props {
  customCssClasses?: CollapsibleFilterDrawerCssClasses,
  cssCompositionMethod?: CompositionMethod,
  pageView: PageView,
  setPageView: (pageView: PageView) => void
};

/**
 * Responsible for managing the CollapsibleFilterDrawer based on the current PageView
 */
export default function CollapsibleFilterDrawer({
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
    const childrenWithWithUpdatedDividers = recursivelyMapChildren(children, child => {
      if (child.type !== Facets && child.type !== StaticFilters && child.type !== Divider ) {
        return child;
      }
      return customizeComponentDivider(child, cssClasses.divider);
    });
    return (
      <div className={cssClasses.container___mobileFiltersExpanded}>
        <CollapseFiltersButton onClick={() => setPageView(PageView.MobileFiltersCollapsed)} />
        <Divider customCssClasses={{ divider: cssClasses.divider }} cssCompositionMethod='assign'/>
        {childrenWithWithUpdatedDividers}
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