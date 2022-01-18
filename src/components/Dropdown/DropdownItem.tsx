import { PropsWithChildren, useCallback, useContext, useLayoutEffect, useMemo } from 'react'
import DropdownContext from './DropdownContext'
import FocusContext from './FocusContext';
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

  const { decoratedToggle, onSelect } = useContext(DropdownContext) || {};
  const { focusedIndex, focusedValue, setFocusedValue } = useContext(FocusContext) || {};
  const { setValue } = useContext(InputContext) || {};

  const needsFocusedValueUpdate = focusedIndex === index && focusedValue !== value;
  useLayoutEffect(() => {
    if (needsFocusedValueUpdate) {
      setFocusedValue && setFocusedValue(value);
      setValue && setValue(value);
    }
  }, [needsFocusedValueUpdate, setFocusedValue, value, setValue])

  const handleClick = useCallback(() => {
    decoratedToggle && decoratedToggle(false);
    setValue && setValue(value);
    onSelect && onSelect(value);
  }, [decoratedToggle, setValue, value, onSelect]);

  const computedClassName = focusedIndex === index ? focusedClassName : className;
  return useMemo(() => {
    return (
      <div
        tabIndex={0}
        className={computedClassName}
        onClick={handleClick}
      >
        {children}
      </div>
    )
  }, [children, computedClassName, handleClick])
}