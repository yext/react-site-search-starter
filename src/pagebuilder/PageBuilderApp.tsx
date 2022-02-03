import PageRouter, { RouteData } from '../PageRouter';
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import { PageViewContextProvider } from '../context/PageViewContext';
import AnswersAppConfig from './models/AnswersAppConfig';
import VerticalStandardPage from './templates/VerticalStandardPage';
import { AnswersAppContextProvider } from './AnswersAppContext';
import { UniversalResultsConfig } from '../components/UniversalResults';
import UniversalStandardPage from './templates/UniversalStandardPage';
import { CardRegistry } from './templates/componentRegistry';
import { LinkData } from '../components/Navigation';
import { UniversalPageConfig } from './models/UniversalPageConfig';
import { VerticalPageConfigs } from './models/VerticalPageConfig';
import { useMemo } from 'react';
import { StyleConfig } from './models/StyleConfig';
import { styleVariables } from './templates/styleVariables';
import get from 'lodash/get';

interface PageBuilderAppProps {
  config: AnswersAppConfig
}

export default function PageBuilderApp({ config }: PageBuilderAppProps) {
  const pageRoutes = constructPageRoutes(config.universal, config.verticals);
  const styles = useMemo(() => createStyleVariables(config.common?.style ?? {}), [config.common?.style]);

  return <AnswersAppContextProvider answersAppConfig={config}>
    <AnswersHeadlessProvider {...config.providerConfig}>
      <PageViewContextProvider >
        <div className='flex justify-center px-4 py-6' style={styles}>
          <div className='w-full max-w-5xl'>
            <PageRouter
              routes={pageRoutes}
            />
          </div>
        </div>
      </PageViewContextProvider>
    </AnswersHeadlessProvider>
  </AnswersAppContextProvider>
}


function constructNavigationLinks(universal: UniversalPageConfig, verticals: VerticalPageConfigs): LinkData[] {
  return [
    {
      to: '/',
      label: universal.label || 'All'
    },
    ...Object.entries(verticals).map(([verticalKey, config]) => ({
      to: config.path || `/${verticalKey}`,
      label: config.label || verticalKey
    }))
  ];
}

function constructPageRoutes(universal: UniversalPageConfig, verticals: VerticalPageConfigs): RouteData[]  {
  const pageRoutes: RouteData[] = [];
  const universalResultsConfig : UniversalResultsConfig = {};
  const navLinks = constructNavigationLinks(universal, verticals);
  Object.entries(verticals).forEach(([key, config]) => {
    const CardComponent = CardRegistry[config.card ?? 'Standard'];
    universalResultsConfig[key] = { 
      label: config.label || key,
      cardConfig: { CardComponent }
    };
    pageRoutes.push({
      path: config.path || `/${key}`,
      page: <VerticalStandardPage verticalKey={key} cardComponent={CardComponent} navLinks={navLinks}/>
    });
  });
  pageRoutes.push({
    path: '/',
    exact: true,
    page: <UniversalStandardPage universalResultsConfig={universalResultsConfig} navLinks={navLinks}/>
  });
  return pageRoutes;
}

function createStyleVariables(config: StyleConfig): React.CSSProperties {
  return styleVariables.reduce((allStyles: React.CSSProperties, style) => {
    const value = get(config, style.path) || style.default;
    return { ...allStyles, [style.name]: value };
  }, {});
}
