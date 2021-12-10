import { AnswersHeadless } from '@yext/answers-headless-react';
import { executeSearch, updateLocationIfNeeded } from '../utils/search-operations';
import { MutableRefObject, useRef } from 'react';
import { AutocompleteResponse, SearchIntent } from '@yext/answers-headless-react';

type QueryFunc = () => Promise<void>
type AutocompleteRef = MutableRefObject<Promise<AutocompleteResponse | undefined> | undefined>

/**
 * Returns a search action that will handle near me searches, by first checking
 * for near me intents using an autocomplete request.
 * You can optionally use the provided ref to store autocomplete responses, to avoid
 * making unnecessary autocomplete requests.
 */
export default function useSearchWithNearMeHandling(
  answersActions: AnswersHeadless,
  isVertical: boolean = false,
  geolocationOptions?: PositionOptions,
): [QueryFunc, AutocompleteRef] {
  /**
   * Allow a query search to wait on the response to the autocomplete request right
   * before the search execution in order to retrieve the search intents
   */
  const autocompletePromiseRef = useRef<Promise<AutocompleteResponse | undefined>>();

  async function executeQuery() {
    let intents: SearchIntent[] = [];
    if (!answersActions.state.location.userLocation) {
      if (!autocompletePromiseRef.current) {
        autocompletePromiseRef.current = isVertical
          ? answersActions.executeVerticalAutocomplete()
          : answersActions.executeUniversalAutocomplete();
      }
      const autocompleteResponseBeforeSearch = await autocompletePromiseRef.current;
      intents = autocompleteResponseBeforeSearch?.inputIntents || [];
      await updateLocationIfNeeded(answersActions, intents, geolocationOptions);
    }
    executeSearch(answersActions, isVertical);
  }
  return [executeQuery, autocompletePromiseRef];
}