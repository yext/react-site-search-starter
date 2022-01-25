import {
  provideAnswersHeadless,
  HeadlessConfig,
  QuerySource,
  AnswersHeadless
} from "@yext/answers-headless-react";
import { useEffect, useState } from "react";

/**
 * Create a new AnswersHeadless searcher for Entity Previews.
 *
 * @param searcherConfig - config for the new AnswersHeadless instance
 */
export default function useEntityPreviewSearcher(searcherConfig: HeadlessConfig): AnswersHeadless | undefined {
  const [ searcher, setSearcher ] = useState<AnswersHeadless>();
  useEffect(() => {
    if (searcher) {
      return;
    }
    const newSearcher = provideAnswersHeadless(searcherConfig);
    newSearcher.setQuerySource(QuerySource.Autocomplete);
    setSearcher(newSearcher);
  }, [searcher, searcherConfig]);
  return searcher;
}