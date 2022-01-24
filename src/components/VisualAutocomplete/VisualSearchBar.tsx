import { HeadlessConfig, useAnswersActions, useAnswersState, useAnswersUtilities, QuerySource, VerticalResults } from '@yext/answers-headless-react';
import { PropsWithChildren, useEffect, useState } from 'react';
import InputDropdown from '../InputDropdown';
import '../../sass/Autocomplete.scss';
import DropdownSection, { Option } from '../DropdownSection';
import { useEntityPreviews } from '../../hooks/useEntityPreviews';
import SearchButton from '../SearchButton';
import { processTranslation } from '../utils/processTranslation';
import { useSynchronizedRequest } from '../../hooks/useSynchronizedRequest';
import { calculateRestrictVerticals, calculateUniversalLimit, transformEntityPreviews } from './EntityPreviews';
import useSearchWithNearMeHandling from '../../hooks/useSearchWithNearMeHandling';
import { builtInCssClasses as builtInSearchBarCssClasses, SearchBarCssClasses } from '../SearchBar';
import { CompositionMethod, useComposedCssClasses } from '../../hooks/useComposedCssClasses';
import { ReactComponent as YextLogoIcon } from '../../icons/yext_logo.svg';
import renderAutocompleteResult from '../utils/renderAutocompleteResult';
import { ReactComponent as RecentSearchIcon } from '../../icons/history.svg';
import useRecentSearches from '../../hooks/useRecentSearches';
import { useHistory } from 'react-router';
import { ReactComponent as MagnifyingGlassIcon } from '../../icons/magnifying_glass.svg';
import { BrowserState } from '../../PageRouter';

const SCREENREADER_INSTRUCTIONS = 'When autocomplete results are available, use up and down arrows to review and enter to select.'
const builtInCssClasses: VisualSearchBarCssClasses = { 
  ...builtInSearchBarCssClasses, 
  recentSearchesOptionContainer: 'flex items-center h-6.5 px-3.5 py-1.5 cursor-pointer hover:bg-gray-100',
  recentSearchesIcon: 'w-5 mr-1 text-gray-300',
  recentSearchesOption: 'pl-3',
  recentSearchesNonHighlighted: 'font-normal', // Swap this to semibold once we apply highlighting to recent searches
  verticalLink: 'ml-12 pl-1 text-gray-500 italic'
};

interface VisualSearchBarCssClasses extends SearchBarCssClasses {
  recentSearchesOptionContainer?: string,
  recentSearchesIcon?: string,
  recentSearchesOption?: string,
  recentSearchesNonHighlighted?: string,
  verticalLink?: string
}

type RenderEntityPreviews = (
  autocompleteLoading: boolean,
  verticalResultsArray: VerticalResults[]
) => JSX.Element;

interface VerticalLink {
  label: string,
  verticalKey: string
}

interface Props {
  placeholder?: string,
  geolocationOptions?: PositionOptions,
  entityPreviewHeadlessConfig: HeadlessConfig,
  // The debouncing time, in milliseconds, for making API requests for entity previews
  entityPreviewsDebouncingTime: number,
  renderEntityPreviews?: RenderEntityPreviews,
  hideVerticalLinks?: boolean,
  verticalKeyToLabel?: (verticalKey: string) => string,
  hideRecentSearches?: boolean,
  recentSearchesLimit?: number,
  customCssClasses?: VisualSearchBarCssClasses,
  cssCompositionMethod?: CompositionMethod
}

/**
 * Renders a SearchBar with visual autocomplete.
 */
export default function VisualSearchBar({
  placeholder,
  entityPreviewHeadlessConfig,
  hideRecentSearches,
  renderEntityPreviews,
  hideVerticalLinks,
  verticalKeyToLabel,
  recentSearchesLimit = 5,
  customCssClasses,
  cssCompositionMethod,
  entityPreviewsDebouncingTime = 500
}: PropsWithChildren<Props>) {
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);

  const browserHistory = useHistory<BrowserState>();
  const answersActions = useAnswersActions();
  const answersUtilities = useAnswersUtilities();
  const query = useAnswersState(state => state.query.input) ?? '';
  const isLoading = useAnswersState(state => state.searchStatus.isLoading) ?? false;
  const [executeQueryWithNearMeHandling, autocompletePromiseRef] = useSearchWithNearMeHandling(answersActions);
  const [autocompleteResponse, executeAutocomplete] = useSynchronizedRequest(async () => {
    return answersActions.executeUniversalAutocomplete();
  });
  const [recentSearches, setRecentSearch, clearRecentSearches] = useRecentSearches(recentSearchesLimit);
  useEffect(() => {
    if (hideRecentSearches) {
      clearRecentSearches();
    }
  }, [clearRecentSearches, hideRecentSearches])

  const [filteredRecentSearches, setFilteredRecentSearches] = useState(recentSearches);
  const haveRecentSearches = !hideRecentSearches && filteredRecentSearches?.length !== 0;

  function executeQuery() {
    if (!hideRecentSearches) {
      const input = answersActions.state.query.input;
      input && setRecentSearch(input);
    }
    executeQueryWithNearMeHandling();
  }

  const [entityPreviewsState, executeEntityPreviewsQuery] = useEntityPreviews(entityPreviewHeadlessConfig, entityPreviewsDebouncingTime);
  const { verticalResultsArray, isLoading: entityPreviewsLoading } = entityPreviewsState;
  const autocompleteResults = autocompleteResponse?.results || [];
  const entityPreviews = renderEntityPreviews && renderEntityPreviews(entityPreviewsLoading, verticalResultsArray);
  function updateEntityPreviews(query: string) {
    if (!renderEntityPreviews) {
      return;
    }
    const restrictVerticals = calculateRestrictVerticals(entityPreviews);
    const universalLimit = calculateUniversalLimit(entityPreviews);
    executeEntityPreviewsQuery(query, universalLimit, restrictVerticals);
  }

  function renderQuerySuggestions() {
    if (autocompleteResults.length === 0) {
      return null;
    }
    let options: Option[] = [];
    autocompleteResults.forEach(result => {
      options.push({
        value: result.value,
        onSelect: () => {
          autocompletePromiseRef.current = undefined;
          answersActions.setQuery(result.value);
          executeQuery();
        },
        display: renderAutocompleteResult(
          result,
          cssClasses,
          MagnifyingGlassIcon,
          `autocomplete suggestion: ${result.value}`
        )
      });

      if (hideVerticalLinks) {
        return;
      }
      const verticalKeys = result.verticalKeys;
      let verticalLinks: VerticalLink[]|undefined = verticalKeys?.map(verticalKey => {
        return { 
          label: verticalKeyToLabel ? verticalKeyToLabel(verticalKey) : verticalKey,
          verticalKey
        }
      });

      verticalLinks?.forEach(link => 
        options.push({
          value: result.value,
          onSelect: () => {
            autocompletePromiseRef.current = undefined;
            answersActions.setQuery(result.value);
            browserHistory.push(`/${link.verticalKey}?query=${result.value}`, {
              querySource: QuerySource.Autocomplete
            });
          },
          display: renderAutocompleteResult({ value: `in ${link.label}` }, { ...cssClasses, option: cssClasses.verticalLink })
        })
      );
    });

    return <DropdownSection
      options={options}
      optionIdPrefix='VisualSearchBar-QuerySuggestions'
      onFocusChange={value => {
        answersActions.setQuery(value);
        updateEntityPreviews(value);
      }}
      cssClasses={cssClasses}
    />
  }

  function renderRecentSearches() {
    const recentSearchesCssClasses = {
      ...cssClasses,
      optionContainer: cssClasses.recentSearchesOptionContainer,
      icon: cssClasses.recentSearchesIcon,
      option: cssClasses.recentSearchesOption,
      nonHighlighted: cssClasses.recentSearchesNonHighlighted
    }
    const options: Option[] = filteredRecentSearches?.map(result => {
      return {
        value: result.query,
        onSelect: () => {
          autocompletePromiseRef.current = undefined;
          answersActions.setQuery(result.query);
          executeQuery();
        },
        display: renderAutocompleteResult(
          { value: result.query },
          recentSearchesCssClasses,
          RecentSearchIcon,
          `recent search: ${result.query}`
        )
      }
    }) ?? [];
    if (options.length === 0) {
      return null;
    }

    return <DropdownSection
      options={options}
      optionIdPrefix='VisualSearchBar-RecentSearches'
      onFocusChange={value => {
        answersActions.setQuery(value);
        updateEntityPreviews(value);
      }}
      cssClasses={recentSearchesCssClasses}
    />
  }

  return (
    <div className={cssClasses.container}>
      <InputDropdown
        inputValue={query}
        placeholder={placeholder}
        screenReaderInstructions={SCREENREADER_INSTRUCTIONS}
        screenReaderText={getScreenReaderText(autocompleteResults.length , filteredRecentSearches?.length || 0)}
        onSubmit={executeQuery}
        onInputChange={value => {
          answersActions.setQuery(value);
        }}
        onInputFocus={value => {
          updateEntityPreviews(value);
          setFilteredRecentSearches(recentSearches?.filter(search => 
            answersUtilities.isCloseMatch(search.query, value)
          ));
          autocompletePromiseRef.current = executeAutocomplete();
        }}
        onDropdownLeave={value => {
          updateEntityPreviews(value);
        }}
        renderSearchButton={() =>
          <SearchButton
            className={cssClasses.submitButton}
            handleClick={executeQuery}
            isLoading={isLoading}
          />
        }
        renderLogo={() => <YextLogoIcon />}
        cssClasses={cssClasses}
        forceHideDropdown={autocompleteResults.length === 0 && verticalResultsArray.length === 0 && !haveRecentSearches}
      >
        {!hideRecentSearches && renderRecentSearches()}
        {renderQuerySuggestions()}
        {entityPreviews && transformEntityPreviews(entityPreviews, verticalResultsArray)}
      </InputDropdown>
    </div>
  )
}

function getScreenReaderText(autocompleteOptions: number, recentSearchesOptions: number) {
  const recentSearchesText = recentSearchesOptions > 0 
    ? processTranslation({
      phrase: `${recentSearchesOptions} recent search found.`,
      pluralForm: `${recentSearchesOptions} recent searches found.`,
      count: recentSearchesOptions
    })
    : '';
  const autocompleteText = processTranslation({
    phrase: `${autocompleteOptions} autocomplete suggestion found.`,
    pluralForm: `${autocompleteOptions} autocomplete suggestions found.`,
    count: autocompleteOptions
  });
  return (recentSearchesText + ' ' + autocompleteText).trim();
}