import { PropsWithChildren } from 'react';
import { useDropdownContext } from './DropdownContext';

/**
 * DropdownMenu is a container for the overlay portion of a Dropdown.
 */
export default function DropdownMenu({ children }: PropsWithChildren<{}>) {
  const { isOpen } = useDropdownContext();
  if (!isOpen) {
    return null;
  }

  return <>{children}</>;
}
