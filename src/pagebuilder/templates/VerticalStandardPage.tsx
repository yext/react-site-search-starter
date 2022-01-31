import ResultsCount from '../../components/ResultsCount';
import AppliedFilters from '../../components/AppliedFilters';
import DirectAnswer from '../../components/DirectAnswer';
import VerticalResults from '../../components/VerticalResults';
import SpellCheck from '../../components/SpellCheck';
import LocationBias from '../../components/LocationBias';
import Navigation, { LinkData } from '../../components/Navigation';
import usePageSetupEffect from '../../hooks/usePageSetupEffect';
import { CardComponent } from '../../models/cardComponent';
import ConfiguredSearchBar from '../components/ConfiguredSearchBar';
import { useAnswersAppContext } from '../AnswersAppContext';
import { useAnswersActions } from '@yext/answers-headless-react';
import { createSortBy } from '../utils/createSortBy';

interface VerticalStandardPageProps {
  verticalKey?: string,
  navLinks?: LinkData[],
  cardComponent: CardComponent
}

export default function VerticalStandardPage(props: VerticalStandardPageProps) {
  const { verticalKey, cardComponent, navLinks } = props;
  const answersAppContext = useAnswersAppContext();
  const answersActions = useAnswersActions();

  usePageSetupEffect(verticalKey, () => {
    const sortOptions = verticalKey
      ? answersAppContext.verticals?.[verticalKey]?.sorting
      : [];
    answersActions.setSortBys(sortOptions?.map(createSortBy) ?? []);
  });

  return (
    <div>
      <ConfiguredSearchBar />
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