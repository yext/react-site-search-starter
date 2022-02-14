import { PropsWithChildren } from 'react';
import { useGroupContext } from './GroupContext';

export default function CollapseButton(props: PropsWithChildren<{
  className?: string
}>) {
  const {
    className = 'w-full flex justify-between items-center mb-4',
    children
  } = props;
  const { getToggleProps } = useGroupContext();
  
  return (
    <button className={className} {...getToggleProps()}>
      {children}
    </button>
  )
}