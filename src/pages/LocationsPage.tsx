import ResultsCount from '../components/ResultsCount';
import AlternativeVerticals from '../components/AlternativeVerticals';
import AppliedFilters from '../components/AppliedFilters';
import DirectAnswer from '../components/DirectAnswer';
import VerticalResults from '../components/VerticalResults';
import SpellCheck from '../components/SpellCheck';
import LocationBias from '../components/LocationBias';
import { StandardCard } from '../components/cards/StandardCard';
import useInitialSearch from '../hooks/useInitialSearch';
import FilterDisplayManager from '../components/FilterDisplayManager';
import FilterSearch from '../components/FilterSearch';
import ViewFiltersButton from '../components/ViewFiltersButton';
import { useContext } from 'react';
import { PageView, PageViewContext } from '../context/PageViewContext';
import Facets from '../components/Facets';
import { ResponsiveDivider } from '../components/ResponsiveDivider';
import { FilterView, FilterViewContext } from '../context/FilterViewContext';

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
  const pageView = useContext(PageViewContext);
  const { filterView } = useContext(FilterViewContext);
  const isFilterHiddenOnMobile = pageView === PageView.Mobile && filterView === FilterView.Hidden;
  useInitialSearch({ verticalKey });

  return (
    <div className='flex'> 
      <FilterDisplayManager>
        <FilterSearch
          label='Filter Search'
          sectioned={true}
          searchFields={filterSearchFields}/>
        <ResponsiveDivider />
        <Facets/>
      </FilterDisplayManager>
      {(pageView === PageView.Desktop || isFilterHiddenOnMobile) &&
        <div className='flex-grow'>
          <DirectAnswer />
          <SpellCheck />
          <div className='flex'>
            <ResultsCount />
            {isFilterHiddenOnMobile && <ViewFiltersButton />}
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