import { ComponentPropsWithRef, useContext } from 'react';
import { PageViewContext, PageView } from '../context/PageViewContext';

export type ResponsiveDividerProps = {
  /** CSS class names applied to the divider above the mobileBreakpoint. */
  desktopClassName?: string,
  /** CSS class names applied to the divider equal to or below the mobileBreakpoint. */
  mobileClassName?: string
} & ComponentPropsWithRef<'div'>;


export function ResponsiveDivider(props: ResponsiveDividerProps): JSX.Element {
  const {
    desktopClassName = 'w-full h-px bg-gray-200 my-4',
    mobileClassName = 'w-screen relative right-4 border-t border-gray-200 my-4',
    ...divProps
  } = props;

  const pageView = useContext(PageViewContext);
  const className = pageView === PageView.Mobile ? mobileClassName : desktopClassName;

  return (
    <div {...divProps} className={className}>
      {props.children}
    </div>
  );
}