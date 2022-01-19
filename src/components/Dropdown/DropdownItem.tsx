import { PropsWithChildren, useContext, useLayoutEffect } from 'react'
import DropdownContext from './DropdownContext'
import FocusContext from './FocusContext';
import generateDropdownId from './generateDropdownId';
import InputContext from './InputContext';

export default function DropdownItem(props: PropsWithChildren<{
  value: string,
  index: number,
  className?: string,
  focusedClassName?: string
}>) {
  const {
    children,
    value,
    index,
    className,
    focusedClassName,
  } = props;

  const { decoratedToggle, onSelect, screenReaderUUID } = useContext(DropdownContext) || {};
  const { focusedIndex, focusedValue, setFocusedValue } = useContext(FocusContext) || {};
  const { setValue } = useContext(InputContext) || {};

  const needsFocusedValueUpdate = focusedIndex === index && focusedValue !== value;
  useLayoutEffect(() => {
    if (needsFocusedValueUpdate) {
      setFocusedValue && setFocusedValue(value);
      setValue && setValue(value);
    }
  }, [needsFocusedValueUpdate, setFocusedValue, value, setValue])

  const handleClick = () => {
    decoratedToggle && decoratedToggle(false);
    setValue && setValue(value);
    onSelect && onSelect(value);
  };

  const computedClassName = focusedIndex === index ? focusedClassName : className;

  return (
    <div
      id={screenReaderUUID && generateDropdownId(screenReaderUUID, index)}
      tabIndex={0}
      className={computedClassName}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}