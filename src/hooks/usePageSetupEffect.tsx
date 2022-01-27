import { useLayoutEffect } from "react";
import { useAnswersActions, SearchIntent, QuerySource } from "@yext/answers-headless-react";
import { executeSearch, getSearchIntents, updateLocationIfNeeded } from "../utils/search-operations";
import { useLocation } from "react-router";
import { BrowserState } from "../PageRouter";

/**
 * Sets up the state for a page
 * @param verticalKey - The verticalKey associated with the page, or undefined for universal pages
 * @param setup - A callback for setting up the page which is called after the state is cleared and
 *                before a search is ran
 */
export default function usePageSetupEffect(verticalKey?: string, setup?: () => void) {
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
        const params = new URLSearchParams(browserLocation.search);
        const queryParam = params.get('query');
        queryParam !== null && answersActions.setQuery(queryParam);
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
    setup?.();
    executeQuery();
  }, [answersActions, verticalKey, browserLocation, setup]);
}