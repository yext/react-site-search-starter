import { useLocation } from "react-router-dom";

export function useQueryParam(): string | null {
  const browserLocation = useLocation();
  let queryParam: string | null = null;
  if (browserLocation.search) {
    const params = new URLSearchParams(browserLocation.search);
    queryParam = params.get('query');
  }
  return queryParam;
}