import { useLayoutEffect } from "react";
import { useAnswersActions, SearchIntent, QuerySource } from "@yext/answers-headless-react";
import { executeSearch, getSearchIntents, updateLocationIfNeeded } from "../utils/search-operations";
import { useLocation } from "react-router";
import { BrowserState } from "../PageRouter";

/**
 * Sets up the state for a page
 * @param verticalKey - The verticalKey associated with the page, or undefined for universal pages
 */
export default function usePageSetupEffect(verticalKey?: string) {
  const answersActions = useAnswersActions();
  const browserLocation = useLocation<BrowserState>();
  useLayoutEffect(() => {
    const stateToClear = {
      filters: {},
      universal: {},
      vertical: {}
    }
    answersActions.setState({
      ...answersActions.state,
      ...stateToClear
    });
    verticalKey
      ? answersActions.setVertical(verticalKey)
      : answersActions.setUniversal();

    const executeQuery = async () => {
      let searchIntents: SearchIntent[] = [];
      if (!answersActions.state.location.userLocation) {
        searchIntents = await getSearchIntents(answersActions, !!verticalKey) || [];
        await updateLocationIfNeeded(answersActions, searchIntents);
      }

      if (browserLocation.search) {
        const queryParamTerm = 'query='
        const queryIndex = browserLocation.search.indexOf(queryParamTerm);
        if (queryIndex >= 0) {
          const encodedQuery = browserLocation.search.slice(queryIndex + queryParamTerm.length);
          answersActions.setQuery(decodeURI(encodedQuery));
        }
      }

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
  }, [answersActions, verticalKey, browserLocation]);
}