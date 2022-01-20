import { createContext, useContext } from 'react';

/**
 * The Context responsibile for the Dropdown state.
 */
export type DropdownContextType = {
  isOpen: boolean,
  screenReaderUUID?: string,
  decoratedToggle: (visible: boolean) => void,
  onSelect?: (value?: string, index?: number) => void
}

const dropdownContext = createContext<DropdownContextType | null>(null);
export default dropdownContext;

export function useDropdownContext(): DropdownContextType {
  const dropdownContextInstance = useContext(dropdownContext);
  if (dropdownContextInstance === null) {
    throw new Error('Tried to use DropdownContext when none exists.')
  }
  return dropdownContextInstance;
}