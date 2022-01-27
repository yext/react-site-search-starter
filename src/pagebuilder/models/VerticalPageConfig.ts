import ComponentConfig from "./ComponentConfig";
import { SortOption } from "./SortOption";

export interface VerticalPageConfigs {
  [verticalKey: string]: VerticalPageConfig
}

export interface VerticalPageConfig {
  label?: string,
  path?: string,
  sorting?: SortOption[],
  card?: "STANDARD" | "PRODUCT" | "ACCORDIAN" | "LOCATION",
  components?: ComponentConfig
}