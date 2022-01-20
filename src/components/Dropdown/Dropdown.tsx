import { PropsWithChildren, useMemo, useRef, useState } from 'react';
import DropdownContext, { DropdownContextType } from './DropdownContext';
import InputContext, { InputContextType } from './InputContext';
import useGlobalListener from '@restart/hooks/useGlobalListener';
import useRootClose from '@restart/ui/useRootClose';
import FocusContext, { FocusContextType } from './FocusContext';
import { v4 as uuid } from 'uuid';
import ScreenReader from '../ScreenReader';

/**
 * Dropdown is the parent component for a set of Dropdown-related components.
 *
 * It provides multiple shared contexts, which are consumed by its child components,
 * and also registers some global event listeners.
 */
export default function Dropdown(props: PropsWithChildren<{
  numItems: number,
  screenReaderText: string,
  screenReaderInstructions?: string,
  initialValue?: string,
  onSelect?: (value?: string, index?: number) => void,
  className?: string,
  activeClassName?: string
}>) {
  const {
    children,
    numItems,
    screenReaderText,
    screenReaderInstructions = 'When autocomplete results are available, use up and down arrows to review and enter to select.',
    initialValue,
    onSelect,
    className,
    activeClassName
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const screenReaderUUID: string = useMemo(() => uuid(), []);

  const [value, setValue] = useState(initialValue ?? '');
  const [lastTypedOrSubmittedValue, setLastTypedOrSubmittedValue] = useState(initialValue ?? '');
  const inputContext: InputContextType = {
    value,
    setValue,
    lastTypedOrSubmittedValue,
    setLastTypedOrSubmittedValue
  };

  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [focusedValue, setFocusedValue] = useState<string>('');
  const focusContext: FocusContextType = {
    focusedIndex,
    setFocusedIndex,
    focusedValue,
    setFocusedValue
  };

  const [_isOpen, _toggle] = useState(false);
  const isOpen = _isOpen && numItems > 0;
  const decoratedToggle = (nextIsOpen: boolean) => {
    _toggle(nextIsOpen);
    if (!nextIsOpen) {
      setFocusedIndex(-1);
    }
  };
  const context: DropdownContextType = {
    isOpen,
    decoratedToggle,
    onSelect,
    screenReaderUUID
  };

  useRootClose(containerRef, () => {
    decoratedToggle(false);
  }, { disabled: !isOpen });

  useGlobalListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
    }
    if (!isOpen) {
      return;
    }
    if (e.key === 'ArrowDown') {
      const updatedFocusedIndex = focusedIndex + 1;
      if (updatedFocusedIndex >= numItems) {
        setFocusedIndex(-1);
        setFocusedValue(lastTypedOrSubmittedValue);
        setValue(lastTypedOrSubmittedValue);
      } else {
        setFocusedIndex(updatedFocusedIndex % numItems);
      }
    } else if (e.key === 'ArrowUp') {
      const updatedFocusedIndex = focusedIndex - 1;
      if (updatedFocusedIndex === -1) {
        setFocusedIndex(updatedFocusedIndex);
        setFocusedValue(lastTypedOrSubmittedValue);
        setValue(lastTypedOrSubmittedValue);
      } else if (updatedFocusedIndex < -1){
        setFocusedIndex((numItems + updatedFocusedIndex + 1) % numItems);
      } else {
        setFocusedIndex(updatedFocusedIndex);
      }
    }
  });

  return (
    <div ref={containerRef} className={isOpen ? activeClassName : className}>
      <DropdownContext.Provider value={context}>
        <InputContext.Provider value={inputContext}>
          <FocusContext.Provider value={focusContext}>
            {children}
          </FocusContext.Provider>
        </InputContext.Provider>
      </DropdownContext.Provider>

      {isOpen && <ScreenReader
        announcementKey={value}
        announcementText={screenReaderText}
        instructionsId={screenReaderUUID}
        instructions={screenReaderInstructions}
      />}
    </div>
  );
}
