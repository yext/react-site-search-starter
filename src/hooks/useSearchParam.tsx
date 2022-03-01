import { useLocation } from "react-router-dom";

export function useSearchParam(searchParam: string): string | null {
  const browserLocation = useLocation();
  let paramValue: string | null = null;
  if (browserLocation.search) {
    const params = new URLSearchParams(browserLocation.search);
    paramValue = params.get(searchParam);
  }
  return paramValue;
}