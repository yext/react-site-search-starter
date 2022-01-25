import { SortType, Direction } from "@yext/answers-headless-react";

export interface SortingConfig {
  options: SortingOption[]
}

interface SortingOption {
  label: string,
  type: SortType,
  field?: string,
  direction?: Direction
}
