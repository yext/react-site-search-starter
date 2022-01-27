import { HeadlessProviderConfig } from '../../config/answersHeadlessConfig';
import { UniversalPageConfig } from './UniversalPageConfig';
import { VerticalPageConfigs } from './VerticalPageConfig';
import ComponentConfig from './ComponentConfig';

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
    components?: ComponentConfig
  },
  universal: UniversalPageConfig,
  verticals: VerticalPageConfigs
}
