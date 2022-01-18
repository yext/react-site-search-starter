import { ChangeEvent, KeyboardEvent, useCallback, useContext, useRef } from 'react'
import DropdownContext from './DropdownContext'
import FocusContext from './FocusContext';
import InputContext from './InputContext';

/**
 * An input component for use within a Dropdown.
 */
export default function DropdownInput(props: {
  className?: string,
  onSubmit?: (value?: string) => void,
  onFocus?: (value?: string) => void,
  onType?: (value?: string) => void
}) {
  const { className, onSubmit, onFocus, onType } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const { decoratedToggle, onSelect } = useContext(DropdownContext) || {};
  const { value = '', setValue } = useContext(InputContext) || {};
  const { focusedIndex = -1, setFocusedIndex, setFocusedValue } = useContext(FocusContext) || {};

  const handleClick = useCallback(() => {
    decoratedToggle && decoratedToggle(true);
  }, [decoratedToggle]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    decoratedToggle && decoratedToggle(true);
    setFocusedValue && setFocusedValue(null);
    setFocusedIndex && setFocusedIndex(-1);
    setValue && setValue(e.target.value);
    onType && onType(e.target.value);
  }, [setValue, decoratedToggle, setFocusedIndex, setFocusedValue, onType]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      decoratedToggle && decoratedToggle(false);
      onSubmit && onSubmit(value);
      if (focusedIndex >= 0) {
        onSelect && onSelect(value, focusedIndex);
      }
      inputRef.current && inputRef.current.blur();
    }
  }, [decoratedToggle, onSubmit, value, focusedIndex, onSelect]);

  const handleFocus = useCallback(() => {
    decoratedToggle && decoratedToggle(true);
    onFocus && onFocus(value);
  }, [decoratedToggle, value, onFocus]);

  return (
    <input
      ref={inputRef}
      className={className}
      value={value}
      onClick={handleClick}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
    />
  )
}