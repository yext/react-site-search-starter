import { createContext, ReactChild, ReactChildren } from 'react';
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

const pageViewContext: PageViewContextInterface = {
  pageView: PageView.Desktop,
  setPageView: (pageView: PageView) => {}
}

export const PageViewContext = createContext<PageViewContextInterface>(pageViewContext);

type Props = {
  children?: ReactChildren | ReactChild | (ReactChildren | ReactChild)[]
}

export function PageViewContextProvider(props: Props): JSX.Element {
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