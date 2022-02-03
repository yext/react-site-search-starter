import { HeadlessProviderConfig } from '../../config/answersHeadlessConfig';
import { UniversalPageConfig } from './UniversalPageConfig';
import { VerticalPageConfigs } from './VerticalPageConfig';
import ComponentConfig from './ComponentConfig';
import { StyleConfig } from './StyleConfig';

interface CommonConfig extends ComponentConfig {
  style: StyleConfig
}

export default interface AnswersAppConfig {
  providerConfig: HeadlessProviderConfig,
  common?: CommonConfig,
  universal: UniversalPageConfig,
  verticals: VerticalPageConfigs
}
