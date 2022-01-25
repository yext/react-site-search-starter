import { HeadlessProviderConfig } from '../../config/answersHeadlessConfig';
import { SearchBarConfig } from './SearchBarConfig';
import { UniversalPageConfig } from './UniversalPageConfig';
import { VerticalPageConfigs } from './VerticalPageConfig';

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
  universal: UniversalPageConfig,
  verticals: VerticalPageConfigs
}
