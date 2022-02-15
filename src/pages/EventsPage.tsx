import ResultsCount from '../components/ResultsCount';
import AlternativeVerticals from '../components/AlternativeVerticals';
import AppliedFilters from '../components/AppliedFilters';
import DirectAnswer from '../components/DirectAnswer';
import VerticalResults from '../components/VerticalResults';
import SpellCheck from '../components/SpellCheck';
import LocationBias from '../components/LocationBias';
import { StandardCard } from '../components/cards/StandardCard';
import usePageSetupEffect from '../hooks/usePageSetupEffect';
import FilterDisplayManager from '../components/FilterDisplayManager';
import ViewFiltersButton from '../components/ViewFiltersButton';
import { useContext } from 'react';
import { PageView, PageViewContext } from '../context/PageViewContext';
import { Filters } from '@yext/answers-react-components';

export default function EventsPage({ verticalKey }: {
  verticalKey: string
}) {
  const { pageView } = useContext(PageViewContext);
  usePageSetupEffect(verticalKey);

  function renderStaticFilters() {
    return (
      <Filters.StaticFilters>
        <Filters.FilterGroup defaultFieldId='venueName'>
          <Filters.CollapsibleLabel>Payment Options</Filters.CollapsibleLabel>
          <Filters.CollapsibleSection>
            <Filters.SearchInput />
            <Filters.CheckboxOption value='West End Avenue'/>
            <Filters.CheckboxOption value='Peaceful Coffee'/>
          </Filters.CollapsibleSection>
        </Filters.FilterGroup>
      </Filters.StaticFilters>
    )
  }

  return (
    <div className='flex'>
      <FilterDisplayManager>
        {renderStaticFilters()}
      </FilterDisplayManager>
      {(pageView === PageView.Desktop || pageView === PageView.FiltersHiddenMobile) &&
        <div className='flex-grow'>
          <DirectAnswer />
          <SpellCheck />
          <div className='flex'>
            <ResultsCount />
            {pageView === PageView.FiltersHiddenMobile &&
              <ViewFiltersButton />}
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
          />
          <LocationBias />
        </div>
      }
    </div>
  )
}