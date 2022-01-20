import { processTranslation } from './utils/processTranslation';
import { ReactComponent as Star } from '../icons/star.svg';
import { useAnswersState, VerticalResults } from '@yext/answers-headless-react';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface AlternativeVerticalsCssClasses {
  container?: string,
  alternativeVerticals___loading?: string,
  noResultsText?: string,
  categoriesText?: string,
  suggestions?: string,
  suggestionList?: string,
  suggestion?: string,
  suggestionButton?: string,
  verticalIcon?: string,
  verticalLink?: string,
  allCategoriesLink?: string 
}

const builtInCssClasses: AlternativeVerticalsCssClasses = {
  container: 'flex flex-col justify-between border rounded-lg mb-4 p-4 shadow-sm',
  alternativeVerticals___loading: 'opacity-50',
  noResultsText: 'text-lg text-gray-900 pb-2',
  categoriesText: 'text-gray-500',
  suggestions: 'pt-4 text-blue-600',
  suggestionList: 'pt-4',
  suggestion: 'pb-4',
  suggestionButton: 'inline-flex items-center cursor-pointer hover:underline focus:underline',
  verticalIcon: 'w-4 mr-2',
  verticalLink: 'font-bold',
  allCategoriesLink: 'text-blue-600 cursor-pointer hover:underline focus:underline'
}

interface VerticalConfig {
  label: string,
  verticalKey: string
}

interface VerticalSuggestion extends VerticalConfig {
  resultsCount: number
}

function isVerticalSuggestion (suggestion: VerticalSuggestion | null): suggestion is VerticalSuggestion {
  return suggestion?.resultsCount !== undefined;
}

interface Props {
  currentVerticalLabel: string,
  verticalsConfig: VerticalConfig[],
  displayAllOnNoResults?: boolean,
  customCssClasses?: AlternativeVerticalsCssClasses,
  cssCompositionMethod?: CompositionMethod
}

export default function AlternativeVerticals ({
  currentVerticalLabel,
  verticalsConfig,
  displayAllOnNoResults = true,
  customCssClasses,
  cssCompositionMethod
}: Props): JSX.Element | null {
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);

  const alternativeVerticals = useAnswersState(state => state.vertical.noResults?.alternativeVerticals) || [];
  const allResultsForVertical = useAnswersState(state => state.vertical.noResults?.allResultsForVertical.results) || [];
  const query = useAnswersState(state => state.query.mostRecentSearch);

  const verticalSuggestions = buildVerticalSuggestions(verticalsConfig, alternativeVerticals);
  const isShowingAllResults = displayAllOnNoResults && allResultsForVertical.length > 0;

  const isLoading = useAnswersState(state => state.searchStatus.isLoading);
  const containerClassNames = classNames(cssClasses.container, {
    [cssClasses.alternativeVerticals___loading ?? '']: isLoading
  });

  function buildVerticalSuggestions(
    verticalsConfig: VerticalConfig[],
    alternativeVerticals: VerticalResults[]) : VerticalSuggestion[] {
    
    return alternativeVerticals
      .map((alternativeResults: VerticalResults) => {
        const matchingVerticalConfig = verticalsConfig.find(config => {
          return config.verticalKey === alternativeResults.verticalKey;
        });

        return matchingVerticalConfig
          ? {
            ...matchingVerticalConfig,
            resultsCount: alternativeResults.resultsCount
          }
          : null;
      })
      .filter(isVerticalSuggestion)
      .filter(verticalSuggestion => verticalSuggestion.resultsCount > 0);
  }

  if (verticalSuggestions.length <= 0) {
    return null;
  }

  return  (
    <div className={containerClassNames}>
      {renderNoResultsInfo()}
      {verticalSuggestions &&
        <div className={cssClasses.suggestions}>
          <div className={cssClasses.categoriesText}>
            <span>
              {processTranslation({
                phrase: 'This category yielded results for - ',
                pluralForm: 'These categories yielded results for - ',
                count: verticalSuggestions.length
              })}
            </span>
            <strong>{query}</strong>
          </div>
          <ul className={cssClasses.suggestionList}>
            {verticalSuggestions.map(renderSuggestion)}
          </ul>
          {renderUniversalDetails()}
        </div>
      }
    </div>
  );

  function renderNoResultsInfo() {
    return (
      <div className={cssClasses.noResultsText}>
        <span>No results found in {currentVerticalLabel}.</span>
        {isShowingAllResults &&
          <span> Showing all {currentVerticalLabel} instead.</span>
        }
      </div>
    );
  }

  function renderSuggestion(suggestion: VerticalSuggestion) {
    return (
      <li key={suggestion.verticalKey} className={cssClasses.suggestion}>
        <Link className={cssClasses.suggestionButton} to={`/${suggestion.verticalKey}`}>
          <div className={cssClasses.verticalIcon}><Star/></div>
          <span className={cssClasses.verticalLink}>{suggestion.label}</span>
        </Link>
      </li>
    );
  }

  function renderUniversalDetails() {
    return (
      <div className={cssClasses.categoriesText}>
        <span>View results across </span>
        <Link className={cssClasses.allCategoriesLink} to='/'>
          all search categories.
        </Link>
      </div>
    );
  }
}