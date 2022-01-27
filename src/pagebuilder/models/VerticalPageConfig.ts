import { EnumOrLiteral } from "@yext/answers-headless-react";
import { CardTypes } from "../templates/componentRegistry";
import { SortingConfig } from "./SortingConfig";

export interface VerticalPageConfigs {
  [verticalKey: string]: VerticalPageConfig
}

export interface VerticalPageConfig {
  label?: string,
  path?: string,
  sorting?: SortingConfig,
  cardConfig?: {
    cardName?: EnumOrLiteral<CardTypes>
  }
}