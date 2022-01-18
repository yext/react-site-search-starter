import { useRef, useState } from "react";
import { provideAnswersHeadless, useAnswersState, VerticalResults, AnswersHeadless, UniversalLimit, QuerySource } from '@yext/answers-headless-react';
import { answersHeadlessConfig } from '../config/answersHeadlessConfig';
import useDebouncedFunction from './useDebouncedFunction';
import useComponentMountStatus from "./useComponentMountStatus";

interface EntityPreviewsState {
  verticalResultsArray: VerticalResults[],
  isLoading: boolean
}

type ExecuteEntityPreviewsQuery = (query: string, universalLimit: UniversalLimit, restrictVerticals: string[]) => void

/**
 * useEntityPreviews provides state surrounding the visual entities portion of visual autocomplete,
 * which performs debounced universal searches.
 * 
 * @param headlessId a unique id for the new headless instance that will be created by the hook
 * @param debounceTime the time in milliseconds to debounce the universal search request
 */
export function useEntityPreviews(headlessId: string, debounceTime: number):[ EntityPreviewsState, ExecuteEntityPreviewsQuery ] {
  const headlessRef = useRef<AnswersHeadless>();
  if (!headlessRef.current) {
    headlessRef.current = provideAnswersHeadless({
      ...answersHeadlessConfig,
      headlessId
    });
  }
  const isMountedRef = useComponentMountStatus();
  const [verticalResultsArray, setVerticalResultsArray] = useState<VerticalResults[]>([]);
  const querySource = useAnswersState(state => state.query.querySource);
  const debouncedUniversalSearch = useDebouncedFunction(async () => {
    if (!headlessRef.current) {
      return;
    }
    headlessRef.current.setQuerySource(QuerySource.Autocomplete);
    await headlessRef.current.executeUniversalQuery();
    /**
     * Avoid performing a React state update on an unmounted component
     * (e.g unmounted during async await)
     */
    if (!isMountedRef.current) {
      return;
    }
    const results = headlessRef.current.state.universal.verticals || [];
    setVerticalResultsArray(results);
    setLoadingState(false);
    headlessRef.current.setQuerySource(querySource ?? QuerySource.Standard);
  }, debounceTime);
  const [isLoading, setLoadingState] = useState<boolean>(false);

  function executeEntityPreviewsQuery(query: string, universalLimit: UniversalLimit, restrictVerticals: string[]) {
    if (!headlessRef.current) {
      return;
    }
    if (query === headlessRef.current.state.query.input) {
      return;
    }
    setLoadingState(true);
    headlessRef.current.setQuery(query);
    headlessRef.current.setRestrictVerticals(restrictVerticals);
    headlessRef.current.setUniversalLimit(universalLimit);
    debouncedUniversalSearch();
  }
  return [{ verticalResultsArray, isLoading }, executeEntityPreviewsQuery];
};