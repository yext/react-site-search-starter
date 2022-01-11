import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PageView } from "../context/PageViewContext";

/**
 * Provides an interface for accessing and setting the page view
 * 
 * @remarks
 * The page view responds to window resizes and can also be manually set
 * to change the type of mobile view
 */
export function usePageView (): [PageView,  Dispatch<SetStateAction<PageView>>] {
  const [pageView, setPageView] = useState<PageView>(
    isMobile() ? PageView.FiltersHiddenMobile : PageView.Desktop);

  function isMobile () {
    return window.innerWidth <= 768;
  }

  useEffect(() => {
    function resizeListener() {
      if (!isMobile()) {
        setPageView(PageView.Desktop);
      } else if (pageView === PageView.Desktop) {
        // Hide filters when transitioning from Desktop
        setPageView(PageView.FiltersHiddenMobile);
      }
    }

    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, [pageView]);

  return [pageView, setPageView];
}