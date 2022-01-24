import { StandardCard } from '../components/cards/StandardCard';
import { UniversalResultsConfig } from '../components/UniversalResults';

export const universalResultsConfig: UniversalResultsConfig = {
  faqs: {
    label: 'FAQs',
    viewAllButton: true,
    cardConfig: {
      CardComponent: StandardCard,
      showOrdinal: false
    }
  },
  events: {
    label: 'Events',
    cardConfig: {
      CardComponent: StandardCard,
      showOrdinal: false
    }
  },
  jobs: {
    label: 'Jobs',
  },
  locations: {
    label: 'Locations',
  }
}