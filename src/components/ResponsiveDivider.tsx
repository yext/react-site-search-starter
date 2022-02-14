import { useContext } from 'react';
import { PageViewContext, PageView } from '../context/PageViewContext';
import { Filters } from '@yext/answers-react-components';

const defaultMobileClassName = 'w-screen relative right-4 border-t border-gray-200 my-4';

export default function ResponsiveDivider({ mobileClassName }: { mobileClassName?: string }) {
  const { pageView } = useContext(PageViewContext);

  if (pageView !== PageView.FiltersVisibleMobile) {
    return <Filters.Divider/>
  }

  return <Filters.Divider className={mobileClassName ?? defaultMobileClassName}/>
}