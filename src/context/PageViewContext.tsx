import { createContext } from 'react';
import { usePageView } from '../hooks/usePageView';

/**
 * Represents the possible views the page can display
 */
export enum PageView {
  Desktop,
  FiltersHiddenMobile,
  FiltersVisibleMobile
} 

interface PageViewContextInterface {
  pageView: PageView,
  setPageView: (pageView: PageView) => void
}

const pageViewContextDefault: PageViewContextInterface = {
  pageView: PageView.Desktop,
  setPageView: (pageView: PageView) => {}
}

export const PageViewContext = createContext<PageViewContextInterface>(pageViewContextDefault);

export function PageViewContextProvider(props: React.PropsWithChildren<{}>): JSX.Element {
  const [pageView, setPageView] = usePageView();

  return (
    <PageViewContext.Provider value={{
      pageView,
      setPageView
    }}>
      {props.children}
    </PageViewContext.Provider>
  )
}