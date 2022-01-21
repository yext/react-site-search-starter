import ResultsCount from '../components/ResultsCount';
import AppliedFilters from '../components/AppliedFilters';
import DirectAnswer from '../components/DirectAnswer';
import VerticalResults from '../components/VerticalResults';
import SpellCheck from '../components/SpellCheck';
import LocationBias from '../components/LocationBias';
import usePageSetupEffect from '../hooks/usePageSetupEffect';
import { CardComponent } from '../models/cardComponent';

export default function StandardPage({ verticalKey, cardComponent }: {
  verticalKey: string,
  cardComponent: CardComponent
}) {
  usePageSetupEffect(verticalKey);
  return (
    <div>
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