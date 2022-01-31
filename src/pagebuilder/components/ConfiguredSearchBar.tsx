import { default as SearchBar } from '../../components/SearchBar';
import useComponentConfig from '../utils/useComponentConfig';

export default function ConfiguredSearchBar() {
  const searchBarConfig = useComponentConfig('searchBar');

  return <SearchBar {...searchBarConfig} />
}