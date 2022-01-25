import Navigation from '../components/Navigation';
import { SearchTypeEnum, useAnswersState } from '@yext/answers-headless-react';
import { universalResultsConfig } from '../config/universalResultsConfig';
import { LayoutComponent } from '../PageRouter';
import SearchBar from '../components/SearchBar';
import SampleVisualSearchBar from '../components/VisualAutocomplete/SampleVisualSearchBar';
import { answersHeadlessConfig } from '../config/answersHeadlessConfig';
import useEntityPreviewSearcher from '../hooks/useEntityPreviewSearcher';

const navLinks = [
  {
    to: '/',
    label: 'All'
  },
  ...Object.entries(universalResultsConfig).map(([verticalKey, config]) => ({
    to: verticalKey,
    label: config.label || verticalKey
  }))
]

const verticalKeyToLabelMap: Record<string, string> = {};
Object.entries(universalResultsConfig)
  .forEach(([key, config]) => { verticalKeyToLabelMap[key] = config.label ?? key })


/**
 * A LayoutComponent that provides a SearchBar and Navigation tabs to a given page.
 */
const StandardLayout: LayoutComponent = ({ page }) => {
  const isVertical = useAnswersState(s => s.meta.searchType) === SearchTypeEnum.Vertical;
  const entityPreviewSearcher = useEntityPreviewSearcher({
    ...answersHeadlessConfig,
    headlessId: 'visual-autocomplete'
  });
  return (
    <>
      {isVertical
        ? <SearchBar
          placeholder='Search...'
        />
        : <SampleVisualSearchBar
          verticalKeyToLabelMap={verticalKeyToLabelMap}
          entityPreviewSearcher={entityPreviewSearcher}
        />
      }
      <Navigation links={navLinks} />
      {page}
    </>
  )
}
export default StandardLayout;