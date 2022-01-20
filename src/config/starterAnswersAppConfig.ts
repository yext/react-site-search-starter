import AnswersAppConfig from "./AnswersAppConfig";

const starterAnswersAppConfig: AnswersAppConfig = {
  providerConfig: {
    apiKey: '3517add824e992916861b76e456724d9',
    experienceKey: 'answers-js-docs',
    locale: 'en',
    sessionTrackingEnabled: true
  },
  universal: {
    label: 'All'
  },
  verticals: {
    faqs: {
      label: 'FAQS',
      path: '/faqs'
    },
    events: {
      label: 'Event',
      path: '/events'
    },
    locations: {
      label: 'Locations',
      path: '/locations'
    },
    jobs: {
      label: 'Jobs',
      path: '/jobs'
    },
  }
}
export default starterAnswersAppConfig;