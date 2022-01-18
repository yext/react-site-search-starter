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
  onSelect?: (value?: string, index?: number) => void,
  onInputValueChange?: (value?: string) => void,
  as?: ElementType,
  className?: string,
  activeClassName?: string
}>) {
  const {
    children,
    numItems,
    onSelect,
    onInputValueChange,
    as: ContainerElementType = 'div',
    className,
    activeClassName
  } = props;
  const containerRef = useRef<HTMLElement>(null);

  const [value, _setValue] = useState<string>('');
  const setValueWithCallback = useCallback((value: string) => {
    _setValue(value);
    onInputValueChange && onInputValueChange(value);
  }, [onInputValueChange])
  const inputContext: InputContextType = useMemo(() => ({
    value,
    setValue: setValueWithCallback
  }), [value, setValueWithCallback]);

  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [focusedValue, setFocusedValue] = useState<string | null>(null);
  const focusContext: FocusContextType = useMemo(() => ({
    focusedIndex,
    setFocusedIndex,
    focusedValue,
    setFocusedValue
  }), [focusedIndex, focusedValue]);

  const [isOpen, _toggle] = useState(false);
  const decoratedToggle = useCallback((nextIsOpen: boolean) => {
    _toggle(nextIsOpen);
    if (!nextIsOpen) {
      setFocusedIndex(-1);
      setFocusedValue(null);
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
      decoratedToggle(true);
      setFocusedValue(null);
      setFocusedIndex((focusedIndex + 1) % numItems);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedValue(null);
      setFocusedIndex(Math.max(focusedIndex - 1, -1));
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
