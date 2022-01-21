import UniversalSearchPage from '../pages/UniversalSearchPage';
import FAQsPage from '../pages/FAQsPage';
import EventsPage from '../pages/EventsPage';
import JobsPage from '../pages/JobsPage';
import LocationsPage from '../pages/LocationsPage'; 
import starterAnswersAppConfig from './starterAnswersAppConfig';
import { CardNameToComponentMapping } from '../models/cardComponent';
import { UniversalResultsConfig } from '../components/UniversalResults';

/**
 * NOTE: This file can be deleted once the ability to add custom page and card templates
 * through AnswersAppConfig json interface is implemented (update starterAnswersAppConfig.ts)
 */

const universalResultsConfig: UniversalResultsConfig = {};
Object.entries(starterAnswersAppConfig.verticals).forEach(([key, config]) => {
  const CardComponent = CardNameToComponentMapping[config.cardConfig?.cardName || 'STANDARD'];
  universalResultsConfig[key] = { 
    label: config.label,
    cardConfig: { CardComponent }
  };
});

export const routeConfig = [
  {
    path: '/',
    exact: true,
    page: <UniversalSearchPage universalResultsConfig={universalResultsConfig} />
  },
  {
    path: '/faqs',
    page: <FAQsPage verticalKey='faqs'/>
  },
  {
    path: '/events',
    page: <EventsPage verticalKey='events'/>
  },
  {
    path: '/locations',
    page: <LocationsPage verticalKey='locations' />
  },
  {
    path: '/jobs',
    page: <JobsPage verticalKey='jobs' />
  }
];