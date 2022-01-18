import { PropsWithChildren, useContext } from 'react';
import DropdownContext from './DropdownContext';

/**
 * DropdownMenu is a container for the overlay portion of a Dropdown.
 */
export default function DropdownMenu({ children, disabled }: PropsWithChildren<{
  disabled: boolean
}>) {
  const context = useContext(DropdownContext);
  if (!context?.isOpen || disabled) {
    return null;
  }

  return <>{children}</>;
}
