import PageRouter, { RouteData } from '../PageRouter';
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import { PageViewContextProvider } from '../context/PageViewContext';
import AnswersAppConfig from './AnswersAppConfig';
import VerticalStandardPage from './templates/VerticalStandardPage';
import { AnswersAppContextProvider } from './AnswersAppContext';
import { UniversalResultsConfig } from '../components/UniversalResults';
import UniversalStandardPage from './templates/UniversalStandardPage';
import { CardNameToComponentMap } from './templates/componentMapping';

export default function PageBuilderApp({ config }: { config: AnswersAppConfig }) {
  const verticalRoutesConfig: RouteData[] = [];
  const universalResultsConfig : UniversalResultsConfig = {};

  const navLinks = [
    {
      to: '/',
      label: config.universal.label || 'All'
    },
    ...Object.entries(config.verticals).map(([verticalKey, config]) => ({
      to: config.path || `/${verticalKey}`,
      label: config.label || verticalKey
    }))
  ];

  Object.entries(config.verticals).forEach(([key, config]) => {
    const CardComponent = CardNameToComponentMap[config.cardConfig?.cardName || 'STANDARD'];
    universalResultsConfig[key] = { 
      label: config.label,
      cardConfig: { CardComponent }
    };
    verticalRoutesConfig.push({
      path: config.path || `/${key}`,
      page: <VerticalStandardPage verticalKey={key} cardComponent={CardComponent} navLinks={navLinks}/>
    });
  });
  verticalRoutesConfig.push({
    path: '/',
    exact: true,
    page: <UniversalStandardPage universalResultsConfig={universalResultsConfig} navLinks={navLinks}/>
  });

  return <AnswersAppContextProvider answersAppConfig={config}>
    <AnswersHeadlessProvider {...config.providerConfig}>
      <PageViewContextProvider >
        <div className='flex justify-center px-4 py-6'>
          <div className='w-full max-w-5xl'>
            <PageRouter
              routes={verticalRoutesConfig}
            />
          </div>
        </div>
      </PageViewContextProvider>
    </AnswersHeadlessProvider>
  </AnswersAppContextProvider>
}
