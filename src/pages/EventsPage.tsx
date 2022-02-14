import ResultsCount from '../components/ResultsCount';
import AlternativeVerticals from '../components/AlternativeVerticals';
import AppliedFilters from '../components/AppliedFilters';
import DirectAnswer from '../components/DirectAnswer';
import VerticalResults from '../components/VerticalResults';
import SpellCheck from '../components/SpellCheck';
import LocationBias from '../components/LocationBias';
import { StandardCard } from '../components/cards/StandardCard';
import usePageSetupEffect from '../hooks/usePageSetupEffect';
import StaticFilters from '../components/Filters/StaticFilters';
import FilterDisplayManager from '../components/FilterDisplayManager';
import ViewFiltersButton from '../components/ViewFiltersButton';
import { useContext } from 'react';
import { PageView, PageViewContext } from '../context/PageViewContext';
import Divider from '../components/Filters/Divider';
import Group from '../components/Filters/Group';
import SearchInput from '../components/Filters/SearchInput';
import CheckboxOption from '../components/Filters/CheckboxOption';
import CollapsibleSection from '../components/Filters/CollapsibleSection';
import CollapsibleLabel from '../components/Filters/CollapsibleLabel';
import Facets from '../components/Filters/Facets';
import ResponsiveDivider from '../components/ResponsiveDivider';

export default function EventsPage({ verticalKey }: {
  verticalKey: string
}) {
  const { pageView } = useContext(PageViewContext);
  usePageSetupEffect(verticalKey);

  function renderStaticFilters() {
    return (
      <StaticFilters>
        <Group defaultFieldId='venueName'>
          <CollapsibleLabel>Payment Options</CollapsibleLabel>
          <CollapsibleSection>
            <SearchInput />
            <CheckboxOption value='West End Avenue'/>
            <CheckboxOption value='Peaceful Coffee'/>
          </CollapsibleSection>
          <ResponsiveDivider/>
        </Group>
      </StaticFilters>
    )
  }

  return (
    <div className='flex'>
      <FilterDisplayManager>
        {renderStaticFilters()}
        <Facets/>
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