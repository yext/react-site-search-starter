import { ElementType, PropsWithChildren, useCallback, useMemo, useRef, useState } from 'react';
import DropdownContext, { DropdownContextType } from './DropdownContext';
import InputContext, { InputContextType } from './InputContext';
import useGlobalListener from '@restart/hooks/useGlobalListener';
import useRootClose from '@restart/ui/useRootClose';
import FocusContext, { FocusContextType } from './FocusContext';

/**
 * Dropdown is the parent component for a set of Dropdown-related components.
 *
 * It provides multiple shared contexts, which are consumed by its child components,
 * and also registers some global event listeners.
 */
export default function Dropdown(props: PropsWithChildren<{
  numItems: number,
  initialValue?: string,
  onSelect?: (value?: string, index?: number) => void,
  as?: ElementType,
  className?: string,
  activeClassName?: string
}>) {
  const {
    children,
    numItems,
    initialValue,
    onSelect,
    as: ContainerElementType = 'div',
    className,
    activeClassName
  } = props;
  const containerRef = useRef<HTMLElement>(null);

  const [value, setValue] = useState(initialValue ?? '');
  const [lastTypedOrSubmittedValue, setLastTypedOrSubmittedValue] = useState(initialValue ?? '');
  const inputContext: InputContextType = useMemo(() => ({
    value,
    setValue,
    lastTypedOrSubmittedValue,
    setLastTypedOrSubmittedValue
  }), [value, lastTypedOrSubmittedValue]);

  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [focusedValue, setFocusedValue] = useState<string | null>(null);
  const focusContext: FocusContextType = useMemo(() => ({
    focusedIndex,
    setFocusedIndex,
    focusedValue,
    setFocusedValue
  }), [focusedIndex, focusedValue]);

  const [_isOpen, _toggle] = useState(false);
  const isOpen = _isOpen && numItems > 0;
  const decoratedToggle = useCallback((nextIsOpen: boolean) => {
    _toggle(nextIsOpen);
    if (!nextIsOpen) {
      setFocusedIndex(-1);
    }
  }, []);
  const context: DropdownContextType = useMemo(() => ({
    isOpen,
    decoratedToggle,
    onSelect
  }), [isOpen, onSelect, decoratedToggle]);

  useRootClose(containerRef, () => {
    decoratedToggle(false);
  }, { disabled: !isOpen });

  useGlobalListener('keydown', e => {
    if (!isOpen) {
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const updatedFocusedIndex = focusedIndex + 1;
      setFocusedValue(null);
      if (updatedFocusedIndex >= numItems) {
        setFocusedIndex(-1);
        setValue(lastTypedOrSubmittedValue);
      } else {
        setFocusedIndex((focusedIndex + 1) % numItems);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedValue(null);
      const updatedFocusedIndex = focusedIndex - 1;
      if (updatedFocusedIndex === -1) {
        setFocusedIndex(updatedFocusedIndex);
        setValue(lastTypedOrSubmittedValue);
      } else if (updatedFocusedIndex < -1){
        setFocusedIndex((numItems + updatedFocusedIndex + 1) % numItems);
      } else {
        setFocusedIndex(updatedFocusedIndex);
      }
    }
  });

  return (
    <ContainerElementType ref={containerRef} className={isOpen ? activeClassName : className}>
      <DropdownContext.Provider value={context}>
        <InputContext.Provider value={inputContext}>
          <FocusContext.Provider value={focusContext}>
            {children}
          </FocusContext.Provider>
        </InputContext.Provider>
      </DropdownContext.Provider>
    </ContainerElementType>
  );
}
