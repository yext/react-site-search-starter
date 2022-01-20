import PageRouter from './PageRouter';
import StandardLayout from './pages/StandardLayout';
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import { PageViewContextProvider } from './context/PageViewContext';
import { routeConfig } from './config/routeConfig';
import { AnswersAppContextProvider } from './context/AnswersAppContext';
import starterAnswersAppConfig from './config/starterAnswersAppConfig';

export default function App() {
  return (
    <AnswersAppContextProvider answersAppConfig={starterAnswersAppConfig}>
      <AnswersHeadlessProvider {...starterAnswersAppConfig.providerConfig}>
        <PageViewContextProvider >
          <div className='flex justify-center px-4 py-6'>
            <div className='w-full max-w-5xl'>
              <PageRouter
                Layout={StandardLayout}
                routes={routeConfig}
              />
            </div>
          </div>
        </PageViewContextProvider>
      </AnswersHeadlessProvider>
    </AnswersAppContextProvider>
  );
}
