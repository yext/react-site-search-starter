import PageRouter from './PageRouter';
import StandardLayout from './pages/StandardLayout';
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import { answersHeadlessConfig } from './config/answersHeadlessConfig';
import { routeConfig } from './config/routeConfig';
import { PageViewContextProvider } from './context/PageViewContext';
import { AnalyticsProvider } from '@yext/answers-react-components';
import { analyticsConfig } from './config/analyticsConfig';

export default function App() {
  return (
    <AnswersHeadlessProvider {...answersHeadlessConfig}>
      <AnalyticsProvider {...analyticsConfig}>
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
      </AnalyticsProvider>
    </AnswersHeadlessProvider>
  );
}
