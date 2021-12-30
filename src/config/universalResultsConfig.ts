import { MovieCard } from '../components/cards/MovieCard';
import { VerticalConfig } from '../components/UniversalResults';

export type UniversalResultsConfig = Record<string, VerticalConfig>;

export const universalResultsConfig: UniversalResultsConfig = {
  movie: {
    label: 'Movie',
    cardConfig: {
      CardComponent: MovieCard,
      showOrdinal: true
    }
  },
}