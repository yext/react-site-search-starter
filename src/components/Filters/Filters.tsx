import { Filter } from '@yext/answers-headless-react'
import { PropsWithChildren } from 'react';
import FiltersContext from './FiltersContext';

export default function Filters(props: PropsWithChildren<{
  handleFilterSelect: (filter: Filter, selected: boolean) => void
}>) {
  const {
    children,
    handleFilterSelect
  } = props;
  const filtersContextInstance = { handleFilterSelect }

  return (
    <FiltersContext.Provider value={filtersContextInstance}>
      {children}
    </FiltersContext.Provider>
  )
}