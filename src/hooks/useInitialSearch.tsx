import { useLayoutEffect } from "react";
import { useAnswersActions, QuerySource, UniversalLimit } from "@yext/answers-headless-react";
import { executeSearch, getSearchIntents, updateLocationIfNeeded } from "../utils/search-operations";
import { useLocation } from "react-router";
import { BrowserState } from "../PageRouter";
import { useQueryParam } from "./useQueryParam";

interface InitialSearchConfig {
  /** The verticalKey associated with the page, or undefined for universal pages. */
  verticalKey?: string,
  /** The default query to be used for the search if there is no query persisted in the URL.
   * This default query will not be persisted in the URL, and, if unspecified, defaults to
   * an empty string. */
  defaultInitialSearch?: string,
  /** The maximum number of results to display on a vertical page. */
  verticalLimit?: number,
  /** The maximum number of results to display per vertical on a universal page. */
  universalLimit?: UniversalLimit
}

/**
 * Clears the state from the previous searcher and performs the initial search when displaying
 * a new universal or vertical page.
 *
 * @param config - The configuration options for the initial search
 */
export default function useInitialSearch(config?: InitialSearchConfig) {
  const { verticalKey, defaultInitialSearch = '', verticalLimit, universalLimit } = config ?? {};
  const answersActions = useAnswersActions();
  const browserLocation = useLocation<BrowserState>();
  const queryParam = useQueryParam();

  useLayoutEffect(() => {
    verticalKey
      ? answersActions.setVertical(verticalKey)
      : answersActions.setUniversal();

    verticalLimit && answersActions.setVerticalLimit(verticalLimit);
    universalLimit && answersActions.setUniversalLimit(universalLimit);

    const executeQuery = async () => {
      if (!answersActions.state.location.userLocation) {
        let searchIntents = await getSearchIntents(answersActions, !!verticalKey) || [];
        await updateLocationIfNeeded(answersActions, searchIntents);
      }

      queryParam != null
        ? answersActions.setQuery(queryParam)
        : answersActions.setQuery(defaultInitialSearch);

      if (browserLocation.state?.querySource) {
        const querySource = answersActions.state.query.querySource;
        answersActions.setQuerySource(browserLocation.state.querySource);
        executeSearch(answersActions, !!verticalKey);
        answersActions.setQuerySource(querySource ?? QuerySource.Standard);
      } else {
        executeSearch(answersActions, !!verticalKey);
      }
    };

    executeQuery();
  }, [
    answersActions,
    verticalKey,
    verticalLimit,
    universalLimit,
    defaultInitialSearch,
    queryParam,
    browserLocation.state?.querySource
  ]);
}