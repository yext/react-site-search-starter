import ResultsCount from '../components/ResultsCount';
import AlternativeVerticals from '../components/AlternativeVerticals';
import AppliedFilters from '../components/AppliedFilters';
import DirectAnswer from '../components/DirectAnswer';
import VerticalResults from '../components/VerticalResults';
import SpellCheck from '../components/SpellCheck';
import LocationBias from '../components/LocationBias';
import { StandardCard } from '../components/cards/StandardCard';
import usePageSetupEffect from '../hooks/usePageSetupEffect';
import CollapsibleFilterContainer from '../components/CollapsibleFilterContainer';
import Facets from '../components/Facets';
import FilterSearch from '../components/FilterSearch';
import { Divider } from '../components/StaticFilters';
import ExpandFiltersButton from '../components/ExpandFiltersButton';
import { PageView, usePageView } from '../hooks/usePageView';

const filterSearchFields = [{
  fieldApiName: 'name',
  entityType: 'location'
}, {
  fieldApiName: 'paymentOptions',
  entityType: 'location'
}, {
  fieldApiName: 'services',
  entityType: 'location'
}];

export default function LocationsPage({ verticalKey }: {
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
        <FilterSearch
          label='Filter Search'
          sectioned={true}
          searchFields={filterSearchFields}
          screenReaderInstructionsId='FilterSearchId'/>
        <Divider />
        <Facets
          searchOnChange={true}
          searchable={true}
          collapsible={true}
          defaultExpanded={true}/>
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
            currentVerticalLabel='Locations'
            verticalsConfig={[
              { label: 'FAQs', verticalKey: 'faqs' },
              { label: 'Jobs', verticalKey: 'jobs' },
              { label: 'Events', verticalKey: 'events' }
            ]}
          />
          <VerticalResults
            CardComponent={StandardCard}
          />
          <LocationBias />
        </div>
      }
    </div>
  )
}