import UniversalSearchPage from '../pages/UniversalSearchPage';
import FAQsPage from '../pages/FAQsPage';
import EventsPage from '../pages/EventsPage';
import { universalResultsConfig } from './universalResultsConfig';
import JobsPage from '../pages/JobsPage';
import LocationsPage from '../pages/LocationsPage'; 

export const routeConfig = [
  {
    path: '/',
    exact: true,
    page: <UniversalSearchPage universalResultsConfig={universalResultsConfig} />
  },
  {
    path: '/people',
    page: <LocationsPage verticalKey='people'/>
  },
];