import { SortType, Direction } from "@yext/answers-headless-react";
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';

export type HeadlessProviderConfig = Parameters<typeof AnswersHeadlessProvider>[0];

interface SortingConfig {
  options: SortingOption[]
}

interface SortingOption {
  label: string,
  type: SortType,
  field?: string,
  direction?: Direction
}

interface SearchBarConfig {    
  placeholder?: string 
}

export interface VerticalPageConfig {
  label?: string,
  path?: string,
  sorting?: SortingConfig,
  cardConfig?: {
    cardName?: "STANDARD" | "PRODUCT" | "ACCORDIAN" | "LOCATION"
  }
}

export default interface AnswersAppConfig {
  providerConfig: HeadlessProviderConfig,
  common?: {
    style: {
      brandColor: string,
      font?: string,
      header?: {
          headline?: string,
          subheader?: string,
          textColor?: string
      },
      ctas?: {
          borderRadius?: number,
          color?: string
      }
    },
    searchBar?: SearchBarConfig
  },
  universal: {
    label?: string
  },
  verticals: {
    [verticalKey: string]: VerticalPageConfig
  }
}
