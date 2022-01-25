import { SortingConfig } from "./SortingConfig";

export interface VerticalPageConfigs {
  [verticalKey: string]: VerticalPageConfig
}

export interface VerticalPageConfig {
  label?: string,
  path?: string,
  sorting?: SortingConfig,
  cardConfig?: {
    cardName?: "STANDARD" | "PRODUCT" | "ACCORDIAN" | "LOCATION"
  }
}