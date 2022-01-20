import Navigation from '../components/Navigation';
import { SearchTypeEnum, useAnswersState } from '@yext/answers-headless-react';
import { LayoutComponent } from '../PageRouter';
import SearchBar from '../components/SearchBar';
import SampleVisualSearchBar from '../components/VisualAutocomplete/SampleVisualSearchBar';
import { useAnswersAppContext } from '../context/AnswersAppContext';

/**
 * A LayoutComponent that provides a SearchBar and Navigation tabs to a given page.
 */
const StandardLayout: LayoutComponent = ({ page }) => {
  const answersAppContext = useAnswersAppContext();
  const navLinks = answersAppContext ? [
    {
      to: '/',
      label: answersAppContext.universal.label || 'All'
    },
    ...Object.entries(answersAppContext.verticals).map(([verticalKey, config]) => ({
      to: config.path || `/${verticalKey}`,
      label: config.label || verticalKey
    }))
  ] : [];
  const isVertical = useAnswersState(s => s.meta.searchType) === SearchTypeEnum.Vertical;
  return (
    <>
      {isVertical
        ? <SearchBar
          placeholder='Search...'
        />
        : <SampleVisualSearchBar />
      }
      {navLinks && <Navigation links={navLinks} />}
      {page}
    </>
  )
}
export default StandardLayout;