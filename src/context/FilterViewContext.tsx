import { createContext, PropsWithChildren, useMemo, useState } from "react";

export enum FilterView {
  Hidden,
  Visible
}

interface FilterViewContextInterface {
  filterView: FilterView,
  setFilterView: (filterView: FilterView) => void
}

const filterViewContextDefault: FilterViewContextInterface = {
  filterView: FilterView.Visible,
  setFilterView: () => {
    console.warn('setFilterView is undefined');
  }
};
export const FilterViewContext = createContext<FilterViewContextInterface>(filterViewContextDefault);

export function FilterViewContextProvider({ children }: PropsWithChildren<{}>): JSX.Element {
  const [filterView, setFilterView] = useState<FilterView>(FilterView.Visible);
  const filterViewContext = useMemo(() => ({ filterView, setFilterView }), [filterView]);
  return (
    <FilterViewContext.Provider value={filterViewContext}>
      {children}
    </FilterViewContext.Provider>
  );
}