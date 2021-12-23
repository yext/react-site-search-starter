import { AnswersHeadlessProvider } from '@yext/answers-headless-react';

type HeadlessProviderProps = Parameters<typeof AnswersHeadlessProvider>[0];

export const answersHeadlessConfig: HeadlessProviderProps = {
  apiKey: '3517add824e992916861b76e456724d9',
  experienceKey: 'answers-js-docs',
  locale: 'en',
  sessionTrackingEnabled: true
};