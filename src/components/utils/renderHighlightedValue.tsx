import { HighlightedValue } from "@yext/answers-headless-react";

/**
 * Renders a HighlightedValue with highlighting based on its matchedSubstrings.
 * @returns JSX.Element
 */
export default function renderHighlightedValue ({ value = '', matchedSubstrings }: Partial<HighlightedValue>): JSX.Element {
  if (!matchedSubstrings || matchedSubstrings.length === 0) {
    return <span>{value}</span>;
  }
  const substrings = [...matchedSubstrings];
  substrings.sort((a, b) => a.offset - b.offset);
  const highlightedJSX = []
  let curr = 0;
  for (let { offset, length } of substrings) {
    if (offset > curr) {
      highlightedJSX.push(<span key={curr}>{value.substring(curr, offset)}</span>)
    }
    highlightedJSX.push(<strong key={offset}>{value.substring(offset, offset + length)}</strong>)
    curr = offset + length;
  }
  if (curr < value.length) {
    highlightedJSX.push(<span key={curr}>{value.substring(curr)}</span>)
  }
  return <>{highlightedJSX}</>;
}