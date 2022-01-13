import { createContext } from 'react';

/**
 * The Context responsibile for the Dropdown state.
 */
export type DropdownContextType = {
  isOpen: boolean,
  decoratedToggle: (visible: boolean) => void,
  onSelect?: (value?: string, index?: number) => void
}

export default createContext<DropdownContextType | null>(null)