import { AnswersHeadlessProvider } from '@yext/answers-headless-react';

type HeadlessProviderProps = Parameters<typeof AnswersHeadlessProvider>[0];

export const answersHeadlessConfig: HeadlessProviderProps = {
  apiKey: '2d8c550071a64ea23e263118a2b0680b',
  experienceKey: 'slanswers-hier-facets',
  locale: 'en',
  sessionTrackingEnabled: true
};