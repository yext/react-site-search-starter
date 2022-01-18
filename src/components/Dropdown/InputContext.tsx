import { createContext } from 'react';

/**
 * A Context for a string state value.
 */
export type InputContextType = {
  value: string,
  setValue: (newValue: string) => void,
  lastTypedOrSubmittedValue: string,
  setLastTypedOrSubmittedValue: (newValue: string) => void
};

export default createContext<InputContextType | null>(null);