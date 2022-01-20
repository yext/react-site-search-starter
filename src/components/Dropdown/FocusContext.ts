import { createContext } from 'react';

/**
 * The Context responsible for the currently focused item in a Dropdown.
 */
export type FocusContextType = {
  focusedIndex: number,
  setFocusedIndex: (index: number) => void,
  focusedValue: string | null,
  setFocusedValue: (value: string) => void
}

export default createContext<FocusContextType | null>(null)