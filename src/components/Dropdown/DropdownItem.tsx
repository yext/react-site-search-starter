import { PropsWithChildren, useLayoutEffect } from 'react'
import { useDropdownContext } from './DropdownContext'
import { useFocusContext } from './FocusContext';
import generateDropdownId from './generateDropdownId';
import { useInputContext } from './InputContext';

type DropdownItemProps = PropsWithChildren<{
  value: string,
  className?: string,
  focusedClassName?: string,
  metadata?: Record<string, unknown> | undefined
}>

/**
 * A wrapper component for specifying a DropdownItemWithIndex.
 * The index will be automatically provided by the {@link Dropdown} component instance.
 */
export default function DropdownItem(_props: DropdownItemProps) { return null; }

export function DropdownItemWithIndex(props: DropdownItemProps & { index: number }) {
  const {
    children,
    value,
    index,
    className,
    focusedClassName,
    metadata
  } = props;

  const { toggleDropdown, onSelect, screenReaderUUID } = useDropdownContext();
  const {
    focusedIndex,
    focusedValue,
    setFocusedValue,
    setFocusedIndex,
    setFocusedMetadata,
    focusedMetadata
  } = useFocusContext();
  const { setValue, setLastTypedOrSubmittedValue } = useInputContext();

  const isFocused = focusedIndex === index;
  const needsFocusedValueUpdate = isFocused && focusedValue !== value;
  const needsFocusedMetadataUpdate = isFocused && focusedMetadata !== metadata;
  useLayoutEffect(() => {
    if (needsFocusedValueUpdate) {
      setFocusedValue(value);
      setValue(value);
    }
    if (needsFocusedMetadataUpdate) {
      setFocusedMetadata(metadata)
    }
  }, [metadata, needsFocusedMetadataUpdate, needsFocusedValueUpdate, setFocusedMetadata, setFocusedValue, setValue, value])

  const handleClick = () => {
    toggleDropdown(false);
    setFocusedIndex(-1);
    setFocusedMetadata(undefined);
    setLastTypedOrSubmittedValue(value);
    setValue(value);
    onSelect?.(value, index, metadata);
  };

  return (
    <div
      id={screenReaderUUID && generateDropdownId(screenReaderUUID, index)}
      tabIndex={0}
      className={isFocused ? focusedClassName : className}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}