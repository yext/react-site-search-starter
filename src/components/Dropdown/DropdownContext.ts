import { createContext, useContext } from 'react';

/**
 * The Context responsible for the Dropdown state.
 */
export type DropdownContextType = {
  isActive: boolean,
  screenReaderUUID?: string,
  toggleDropdown: (visible: boolean) => void,
  onSelect?: (value: string, index: number, focusedItemData: Record<string, unknown> | undefined) => void
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