import AnswersAppConfig from "../models/AnswersAppConfig";

const pageBuilderAnswersAppConfig: AnswersAppConfig = {
  providerConfig: {
    apiKey: '3517add824e992916861b76e456724d9',
    experienceKey: 'answers-js-docs',
    locale: 'en',
    sessionTrackingEnabled: true
  },
  common: {
    style: {
      brandColor: '',
    }
  },
  universal: {
    label: 'All'
  },
  verticals: {
    faqs: {
      label: 'FAQS',
      path: '/faqs',
      cardConfig: {
        cardName: "STANDARD"
      }
    },
    events: {
      label: 'Event',
      path: '/events',
      cardConfig: {
        cardName: "STANDARD"
      }
    },
    locations: {
      label: 'Locations',
      path: '/locations',
      cardConfig: {
        cardName: "STANDARD"
      }
    },
    jobs: {
      label: 'Jobs',
      path: '/jobs',
      cardConfig: {
        cardName: "STANDARD"
      }
    },
  }
}
export default pageBuilderAnswersAppConfig;
