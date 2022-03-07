import { createContext } from 'react';
import { useWindowWidth } from '@react-hook/window-size';

/**
 * Represents the possible views the page can display
 */
export enum PageView {
  Desktop,
  Mobile
}

export const PageViewContext = createContext<PageView>(PageView.Desktop);

export function PageViewContextProvider(
  props: React.PropsWithChildren<{ mobileWidth?: string }>
): JSX.Element {
  const { mobileWidth = 768, children } = props;
  const windowWidth = useWindowWidth({ wait: 50 });
  const pageView = windowWidth <= mobileWidth ? PageView.Mobile : PageView.Desktop;

  return (
    <PageViewContext.Provider value={pageView}>
      {children}
    </PageViewContext.Provider>
  );
}