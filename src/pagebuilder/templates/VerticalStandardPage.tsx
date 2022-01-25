import ResultsCount from '../../components/ResultsCount';
import AppliedFilters from '../../components/AppliedFilters';
import DirectAnswer from '../../components/DirectAnswer';
import VerticalResults from '../../components/VerticalResults';
import SpellCheck from '../../components/SpellCheck';
import LocationBias from '../../components/LocationBias';
import SearchBar from '../../components/SearchBar';
import Navigation, { LinkData } from '../../components/Navigation';
import usePageSetupEffect from '../../hooks/usePageSetupEffect';
import { CardComponent } from '../../models/cardComponent';
import { useAnswersAppContext } from '../AnswersAppContext';

interface VerticalStandardPageProps {
  verticalKey?: string,
  navLinks?: LinkData[],
  cardComponent: CardComponent
}

export default function VerticalStandardPage(props: VerticalStandardPageProps) {
  const { verticalKey, cardComponent, navLinks } = props;
  usePageSetupEffect(verticalKey);

  const answersAppContext = useAnswersAppContext();
  return (
    <div>
      <SearchBar
        placeholder={answersAppContext.common?.searchBar?.placeholder}
      />
      <Navigation links={navLinks || []} />
      <DirectAnswer />
      <SpellCheck />
      <ResultsCount />
      <AppliedFilters
        hiddenFields={['builtin.entityType']}
      />
      <VerticalResults
        CardComponent={cardComponent}
      />
      <LocationBias />
    </div>
  )
}