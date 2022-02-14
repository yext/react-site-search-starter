import { PropsWithChildren } from 'react';
import { useGroupContext } from './GroupContext';

export default function CollapsibleSection(props: PropsWithChildren<{
  className?: string
}>) {
  const {
    className = 'flex flex-col space-y-3',
    children
  } = props;

  const { getCollapseProps } = useGroupContext();
  
  return (
    <div className={className} {...getCollapseProps()}>
      {children}
    </div>
  )
}