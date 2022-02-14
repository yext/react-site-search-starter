import { PropsWithChildren, useState } from 'react';
import useCollapse from 'react-collapsed';
import GroupContext from './GroupContext';

export default function Group(props: PropsWithChildren<{
  defaultExpanded?: boolean,
  defaultFieldId?: string
}>) {
  const {
    children,
    defaultExpanded = true,
    defaultFieldId
  } = props

  const [searchValue, setSearchValue] = useState('');
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({ defaultExpanded });
  const groupContextInstance = {
    defaultFieldId,
    searchValue,
    setSearchValue,
    getCollapseProps,
    getToggleProps,
    isExpanded
  }

  return (
    <GroupContext.Provider value={groupContextInstance}>
      {children}
    </GroupContext.Provider>
  )
}