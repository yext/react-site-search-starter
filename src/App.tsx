import PageRouter from './PageRouter';
import StandardLayout from './pages/StandardLayout';
import { AnswersHeadlessProvider } from '@yext/answers-headless-react';
import { PageViewContextProvider } from './context/PageViewContext';
import { routeConfig } from './config/routeConfig';
import { answersHeadlessConfig } from './config/answersHeadlessConfig';

export default function App() {
  return (
    <AnswersHeadlessProvider {...answersHeadlessConfig}>
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
  );
}
