import { createElement, isValidElement, PropsWithChildren, useMemo, useRef, useState } from 'react';
import DropdownContext, { DropdownContextType } from './DropdownContext';
import InputContext, { InputContextType } from './InputContext';
import useGlobalListener from '@restart/hooks/useGlobalListener';
import useRootClose from '@restart/ui/useRootClose';
import FocusContext, { FocusContextType } from './FocusContext';
import { v4 as uuid } from 'uuid';
import ScreenReader from '../ScreenReader';
import recursivelyMapChildren from '../utils/recursivelyMapChildren';
import DropdownItem, { DropdownItemWithIndex } from './DropdownItem';

/**
 * Dropdown is the parent component for a set of Dropdown-related components.
 *
 * It provides multiple shared contexts, which are consumed by its child components,
 * and also registers some global event listeners.
 */
export default function Dropdown(props: PropsWithChildren<{
  screenReaderText: string,
  screenReaderInstructions?: string,
  initialValue?: string,
  onSelect?: (value: string, index: number, focusedItemData: Record<string, unknown> | undefined) => void,
  onToggle?: (isActive: boolean, value: string) => void,
  className?: string,
  activeClassName?: string
}>) {
  const {
    children,
    screenReaderText,
    screenReaderInstructions = 'When autocomplete results are available, use up and down arrows to review and enter to select.',
    initialValue,
    onSelect,
    onToggle,
    className,
    activeClassName
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const screenReaderUUID: string = useMemo(() => uuid(), []);

  const inputContext = useInputContextInstance(initialValue);
  const { value, setValue, lastTypedOrSubmittedValue } = inputContext;
  const focusContext = useFocusContextInstance();
  const { focusedIndex, setFocusedIndex, setFocusedValue, setFocusedItemData } = focusContext;
  const dropdownContext = useDropdownContextInstance(value, screenReaderUUID, onToggle, onSelect);
  const { toggleDropdown, isActive } = dropdownContext;

  useRootClose(containerRef, () => {
    toggleDropdown(false);
  }, { disabled: !isActive });

  useGlobalListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
    }
    if (!isActive) {
      return;
    }
    if (e.key === 'ArrowDown') {
      const updatedFocusedIndex = focusedIndex + 1;
      if (updatedFocusedIndex >= numItems) {
        setFocusedIndex(-1);
        setFocusedValue(lastTypedOrSubmittedValue);
        setFocusedItemData(undefined);
        setValue(lastTypedOrSubmittedValue);
      } else {
        setFocusedIndex(updatedFocusedIndex);
      }
    } else if (e.key === 'ArrowUp') {
      const updatedFocusedIndex = focusedIndex - 1;
      if (updatedFocusedIndex === -1) {
        setFocusedIndex(updatedFocusedIndex);
        setFocusedValue(lastTypedOrSubmittedValue);
        setFocusedItemData(undefined);
        setValue(lastTypedOrSubmittedValue);
      } else if (updatedFocusedIndex < -1){
        setFocusedIndex((numItems + updatedFocusedIndex + 1) % numItems);
      } else {
        setFocusedIndex(updatedFocusedIndex);
      }
    }
  });

  let numItems = 0;
  const childrenWithDropdownItemsTransformed = recursivelyMapChildren(children, (child => {
    if (!(isValidElement(child) && child.type === DropdownItem)) {
      return child;
    }
    const transformedItem = createElement(DropdownItemWithIndex, { ...child.props, index: numItems })
    numItems++;
    return transformedItem;
  }));

  return (
    <div ref={containerRef} className={isActive ? activeClassName : className}>
      <DropdownContext.Provider value={dropdownContext}>
        <InputContext.Provider value={inputContext}>
          <FocusContext.Provider value={focusContext}>
            {childrenWithDropdownItemsTransformed}
          </FocusContext.Provider>
        </InputContext.Provider>
      </DropdownContext.Provider>

      <ScreenReader
        announcementKey={value}
        announcementText={isActive ? screenReaderText : ''}
        instructionsId={screenReaderUUID}
        instructions={screenReaderInstructions}
      />
    </div>
  );
}

function useInputContextInstance(initialValue = ''): InputContextType {
  const [value, setValue] = useState(initialValue);
  const [lastTypedOrSubmittedValue, setLastTypedOrSubmittedValue] = useState(initialValue);
  return {
    value,
    setValue,
    lastTypedOrSubmittedValue,
    setLastTypedOrSubmittedValue
  };
}

function useFocusContextInstance(): FocusContextType {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [focusedValue, setFocusedValue] = useState<string>('');
  const [focusedItemData, setFocusedItemData] = useState<Record<string, unknown> | undefined>(undefined);
  return {
    focusedIndex,
    setFocusedIndex,
    focusedValue,
    setFocusedValue,
    focusedItemData,
    setFocusedItemData
  };
}

function useDropdownContextInstance(
  value: string,
  screenReaderUUID: string,
  onToggle?: (isActive: boolean, value: string) => void,
  onSelect?: (value: string, index: number, focusedItemData: Record<string, unknown> | undefined) => void,
): DropdownContextType {
  const [isActive, _toggleDropdown] = useState(false);
  const toggleDropdown = (willBeOpen: boolean) => {
    _toggleDropdown(willBeOpen);
    onToggle?.(willBeOpen, value);
  };
  return {
    isActive,
    toggleDropdown,
    onSelect,
    screenReaderUUID
  };
}