import { PropsWithChildren, useContext } from 'react';
import DropdownContext from './DropdownContext';

/**
 * DropdownMenu is a container for the overlay portion of a Dropdown.
 */
export default function DropdownMenu({ children }: PropsWithChildren<{}>) {
  const context = useContext(DropdownContext);
  if (!context?.isOpen) {
    return null;
  }

  return <>{children}</>;
}
