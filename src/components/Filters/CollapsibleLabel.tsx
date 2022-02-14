import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { ReactComponent as DropdownIcon } from '../../icons/chevron.svg';
import CollapseButton from './CollapseButton';
import { useGroupContext } from './GroupContext';
import Label from './Label';

export default function CollapsibleLabel({ children }: PropsWithChildren<{}>) {
  const { isExpanded } = useGroupContext();
  const iconClassName = classNames('w-3', {
    'transform rotate-180': !isExpanded
  });

  return (
    <CollapseButton>
      <Label>{children}</Label>
      <DropdownIcon className={iconClassName}/>
    </CollapseButton>
  )
}