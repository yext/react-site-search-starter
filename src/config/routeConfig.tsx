import UniversalSearchPage from '../pages/UniversalSearchPage';
import { universalResultsConfig } from './universalResultsConfig';

export const routeConfig = [
  {
    path: '/',
    exact: true,
    page: <UniversalSearchPage universalResultsConfig={universalResultsConfig} />
  }
];