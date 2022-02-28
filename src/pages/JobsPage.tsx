import ResultsCount from '../components/ResultsCount';
import AlternativeVerticals from '../components/AlternativeVerticals';
import AppliedFilters from '../components/AppliedFilters';
import DirectAnswer from '../components/DirectAnswer';
import VerticalResults from '../components/VerticalResults';
import SpellCheck from '../components/SpellCheck';
import LocationBias from '../components/LocationBias';
import { StandardCard } from '../components/cards/StandardCard';
import useInitialSearch from '../hooks/useInitialSearch';

export default function JobsPage({ verticalKey }: {
  verticalKey: string
}) {
  useInitialSearch({ verticalKey });

  return (
    <div>
      <DirectAnswer />
      <SpellCheck />
      <ResultsCount />
      <AppliedFilters
        hiddenFields={['builtin.entityType']}
      />
      <AlternativeVerticals
        currentVerticalLabel='Jobs'
        verticalsConfig={[
          { label: 'FAQs', verticalKey: 'faqs' },
          { label: 'Events', verticalKey: 'events' },
          { label: 'Locations', verticalKey: 'locations' }
        ]}
      />
      <VerticalResults
        CardComponent={StandardCard}
      />
      <LocationBias />
    </div>
  )
}