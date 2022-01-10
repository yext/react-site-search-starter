import ResultsCount from '../components/ResultsCount';
import AlternativeVerticals from '../components/AlternativeVerticals';
import AppliedFilters from '../components/AppliedFilters';
import DirectAnswer from '../components/DirectAnswer';
import VerticalResults from '../components/VerticalResults';
import SpellCheck from '../components/SpellCheck';
import LocationBias from '../components/LocationBias';
import { StandardCard } from '../components/cards/StandardCard';
import usePageSetupEffect from '../hooks/usePageSetupEffect';
import StaticFilters from '../components/StaticFilters';
import CollapsibleFilterContainer from '../components/CollapsibleFilterContainer';
import ExpandFiltersButton from '../components/ExpandFiltersButton';
import { PageView, usePageView } from '../hooks/usePageView';

const staticFiltersConfig = [{
  title: 'Venue',
  options: [
    {
      label: 'West End Avenue',
      fieldId: 'venueName',
      value: 'West End Avenue'
    },
    {
      label: 'Peaceful Coffee',
      fieldId: 'venueName',
      value: 'Peaceful Coffee',
    },
  ]
}]

export default function EventsPage({ verticalKey }: {
  verticalKey: string
}) {
  const [pageView, setPageView] = usePageView();
  usePageSetupEffect(verticalKey);

  return (
    <div className='flex'>
      <CollapsibleFilterContainer
        pageView={pageView}
        setPageView={setPageView}
      >
        <StaticFilters
          filterConfig={staticFiltersConfig}
        />
      </CollapsibleFilterContainer>
      { (pageView === PageView.Desktop || pageView === PageView.MobileFiltersCollapsed) &&
        <div className='flex-grow'>
          <DirectAnswer />
          <SpellCheck />
          <div className='flex'>
            <ResultsCount />
            {pageView === PageView.MobileFiltersCollapsed && 
              <ExpandFiltersButton onClick={() => setPageView(PageView.MobileFiltersExpanded)}/>}
          </div>
          <AppliedFilters
            hiddenFields={['builtin.entityType']}
          />
          <AlternativeVerticals
            currentVerticalLabel='Events'
            verticalsConfig={[
              { label: 'FAQs', verticalKey: 'faqs' },
              { label: 'Jobs', verticalKey: 'jobs' },
              { label: 'Locations', verticalKey: 'locations' }
            ]}
          />
          <VerticalResults
            CardComponent={StandardCard}
            displayAllResults={true}
          />
          <LocationBias />
        </div>
      }
    </div>
  )
}