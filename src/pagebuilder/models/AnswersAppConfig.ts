import { HeadlessProviderConfig } from '../../config/answersHeadlessConfig';
import { UniversalPageConfig } from './UniversalPageConfig';
import { VerticalPageConfigs } from './VerticalPageConfig';
import ComponentConfig from './ComponentConfig';

interface CommonConfig extends ComponentConfig {
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
  }
}

export default interface AnswersAppConfig {
  providerConfig: HeadlessProviderConfig,
  common?: CommonConfig,
  universal: UniversalPageConfig,
  verticals: VerticalPageConfigs
}
