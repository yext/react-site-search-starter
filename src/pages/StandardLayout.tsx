import Navigation from '../components/Navigation';
import { SearchTypeEnum, useAnswersState } from '@yext/answers-headless-react';
import { universalResultsConfig } from '../config/universalResultsConfig';
import { LayoutComponent } from '../PageRouter';
import SearchBar from '../components/SearchBar';
import SampleVisualSearchBar from '../components/VisualAutocomplete/SampleVisualSearchBar';
import { answersHeadlessConfig } from '../config/answersHeadlessConfig';

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

const entityPreviewHeadlessConfig = {
  ...answersHeadlessConfig,
  headlessId: 'visual-autocomplete'
};

/**
 * A LayoutComponent that provides a SearchBar and Navigation tabs to a given page.
 */
const StandardLayout: LayoutComponent = ({ page }) => {
  const isVertical = useAnswersState(s => s.meta.searchType) === SearchTypeEnum.Vertical;
  return (
    <>
      {isVertical
        ? <SearchBar
          placeholder='Search...'
        />
        : <SampleVisualSearchBar verticalKeyToLabelMap={verticalKeyToLabelMap} entityPreviewHeadlessConfig={entityPreviewHeadlessConfig}/>
      }
      <Navigation links={navLinks} />
      {page}
    </>
  )
}
export default StandardLayout;