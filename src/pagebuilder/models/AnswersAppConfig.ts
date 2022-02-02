import { HeadlessProviderConfig } from '../../config/answersHeadlessConfig';
import { UniversalPageConfig } from './UniversalPageConfig';
import { VerticalPageConfigs } from './VerticalPageConfig';
import ComponentConfig from './ComponentConfig';

interface CommonConfig extends ComponentConfig {
  style: {
    brandColor?: string,
    baseFontSize?: string,
    ctas?: {
        borderRadius?: string,
        color?: string
    }
  }
}

export default interface AnswersAppConfig {
  providerConfig: HeadlessProviderConfig,
  common?: CommonConfig,
  universal: UniversalPageConfig,
  verticals: VerticalPageConfigs
}
