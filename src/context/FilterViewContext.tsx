import { createContext } from "react";

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
