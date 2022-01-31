import ComponentConfig from "./ComponentConfig";
import { SortOption } from "./SortOption";

export interface VerticalPageConfigs {
  [verticalKey: string]: VerticalPageConfig
}

export interface VerticalPageConfig extends ComponentConfig {
  label?: string,
  path?: string,
  sorting?: SortOption[],
  card?: 'Standard'
}