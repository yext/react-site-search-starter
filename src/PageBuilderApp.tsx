import PageRouter, { RouteData } from './PageRouter';
import StandardLayout from './templates/StandardLayout';
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import { PageViewContextProvider } from './context/PageViewContext';
import UniversalSearchPage from './pages/UniversalSearchPage';
import AnswersAppConfig from './config/AnswersAppConfig';
import { CardNameToComponentMapping } from './models/cardComponent';
import { UniversalResultsConfig } from './config/universalResultsConfig';
import StandardPage from './templates/StandardPage';
import { AnswersAppContextProvider } from './context/AnswersAppContext';

export default function PageBuilderApp({ config }: { config: AnswersAppConfig }) {
  const verticalRoutesConfig: RouteData[] = [];
  const universalResultsConfig : UniversalResultsConfig = {};

  Object.entries(config.verticals).forEach(([key, config]) => {
    const CardComponent = CardNameToComponentMapping[config.cardConfig?.cardName || 'STANDARD'];
    universalResultsConfig[key] = { 
      label: config.label,
      cardConfig: { CardComponent }
    };
    verticalRoutesConfig.push({
      path: config.path || `/${key}`,
      page: <StandardPage verticalKey={key} cardComponent={CardComponent}/>
    });
  });
  verticalRoutesConfig.push({
    path: '/',
    exact: true,
    page: <UniversalSearchPage universalResultsConfig={universalResultsConfig} />
  });

  return <AnswersAppContextProvider answersAppConfig={config}>
    <AnswersHeadlessProvider {...config.providerConfig}>
      <PageViewContextProvider >
        <div className='flex justify-center px-4 py-6'>
          <div className='w-full max-w-5xl'>
            <PageRouter
              Layout={StandardLayout}
              routes={verticalRoutesConfig}
            />
          </div>
        </div>
      </PageViewContextProvider>
    </AnswersHeadlessProvider>
  </AnswersAppContextProvider>
}
