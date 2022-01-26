import { createElement, isValidElement, PropsWithChildren, ReactNode, useMemo, useRef, useState } from 'react';
import DropdownContext, { DropdownContextType } from './DropdownContext';
import InputContext, { InputContextType } from './InputContext';
import useGlobalListener from '@restart/hooks/useGlobalListener';
import useRootClose from '@restart/ui/useRootClose';
import FocusContext, { FocusContextType } from './FocusContext';
import { v4 as uuid } from 'uuid';
import ScreenReader from '../ScreenReader';
import recursivelyMapChildren from '../utils/recursivelyMapChildren';
import DropdownItem, { DropdownItemProps, DropdownItemWithIndex } from './DropdownItem';

type DropdownItemData = {
  value: string,
  itemData?: Record<string, unknown>
};

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
  const [childrenWithDropdownItemsTransformed, items] = getTransformedChildrenAndItemData(children);

  const inputContext = useInputContextInstance(initialValue);
  const { value, setValue, lastTypedOrSubmittedValue } = inputContext;

  const focusContext = useFocusContextInstance(items, lastTypedOrSubmittedValue, setValue);
  const { focusedIndex, updateFocusedIndex } = focusContext;

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
      updateFocusedIndex(focusedIndex + 1);
    } else if (e.key === 'ArrowUp') {
      updateFocusedIndex(focusedIndex - 1);
    }
  });

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

function useFocusContextInstance(
  items: DropdownItemData[],
  lastTypedOrSubmittedValue: string,
  setValue: (newValue: string) => void
): FocusContextType {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [focusedValue, setFocusedValue] = useState<string | null>(null);
  const [focusedItemData, setFocusedItemData] = useState<Record<string, unknown> | undefined>(undefined);
  const numItems = items.length;

  function updateFocusedIndex(updatedFocusedIndex: number, value?: string) {
    if (updatedFocusedIndex === -1 || updatedFocusedIndex >= numItems) {
      setFocusedIndex(-1);
      setFocusedValue(value ?? lastTypedOrSubmittedValue);
      setValue(value ?? lastTypedOrSubmittedValue);
      setFocusedItemData(undefined);
    } else if (updatedFocusedIndex < -1) {
      const loopedAroundIndex = (numItems + updatedFocusedIndex + 1) % numItems;
      setFocusedIndex(loopedAroundIndex);
      setFocusedValue(value ?? items[loopedAroundIndex].value);
      setValue(value ?? items[loopedAroundIndex].value);
      setFocusedItemData(items[loopedAroundIndex].itemData);
    } else {
      setFocusedIndex(updatedFocusedIndex);
      setFocusedValue(value ?? items[updatedFocusedIndex].value);
      setValue(value ?? items[updatedFocusedIndex].value);
      setFocusedItemData(items[updatedFocusedIndex].itemData);
    }
  }

  return {
    focusedIndex,
    focusedValue,
    focusedItemData,
    updateFocusedIndex
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

function getTransformedChildrenAndItemData(children: ReactNode): [ReactNode, DropdownItemData[]] {
  const items: DropdownItemData [] = []
  const childrenWithDropdownItemsTransformed = recursivelyMapChildren(children, (child => {
    if (!(isValidElement(child) && child.type === DropdownItem)) {
      return child;
    }
    const props: DropdownItemProps = child.props;
    items.push({
      value: props.value,
      itemData: props.itemData
    });
    const transformedItem = createElement(DropdownItemWithIndex, { ...props, index: items.length - 1 })
    return transformedItem;
  }));

  return [childrenWithDropdownItemsTransformed, items];
}