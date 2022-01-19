import { ChangeEvent, KeyboardEvent, useContext, useRef } from 'react'
import DropdownContext from './DropdownContext'
import FocusContext from './FocusContext';
import generateDropdownId from './generateDropdownId';
import InputContext from './InputContext';

/**
 * An input component for use within a Dropdown.
 */
export default function DropdownInput(props: {
  className?: string,
  placeholder?: string,
  onSubmit?: (value?: string) => void,
  onFocus?: (value?: string) => void,
  onType?: (value?: string) => void
}) {
  const {
    className,
    placeholder,
    onSubmit,
    onFocus,
    onType
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const { decoratedToggle, onSelect, screenReaderUUID } = useContext(DropdownContext) || {};
  const { value = '', setValue, setLastTypedOrSubmittedValue } = useContext(InputContext) || {};
  const { focusedIndex = -1, setFocusedIndex } = useContext(FocusContext) || {};

  const handleClick = () => {
    decoratedToggle && decoratedToggle(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    decoratedToggle && decoratedToggle(true);
    setFocusedIndex && setFocusedIndex(-1);
    setLastTypedOrSubmittedValue && setLastTypedOrSubmittedValue(e.target.value);
    setValue && setValue(e.target.value);
    onType && onType(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      decoratedToggle && decoratedToggle(false);
      onSubmit && onSubmit(value);
      setLastTypedOrSubmittedValue && setLastTypedOrSubmittedValue(value);
      if (focusedIndex >= 0) {
        onSelect && onSelect(value, focusedIndex);
      }
      inputRef.current && inputRef.current.blur();
    }
  };

  const handleFocus = () => {
    decoratedToggle && decoratedToggle(true);
    onFocus && onFocus(value);
  };

  return (
    <input
      ref={inputRef}
      className={className}
      placeholder={placeholder}
      value={value}
      onClick={handleClick}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      aria-describedby={screenReaderUUID}
      aria-activedescendant={screenReaderUUID && generateDropdownId(screenReaderUUID, focusedIndex)}
    />
  )
}