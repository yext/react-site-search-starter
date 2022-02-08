import { Filter, Matcher } from "@yext/answers-headless-react";
import useCollapse from "react-collapsed";
import { CompositionMethod, useComposedCssClasses } from "../hooks/useComposedCssClasses";
import renderCheckboxOption, { CheckboxOptionCssClasses } from "./utils/renderCheckboxOption";
import { ReactComponent as DropdownIcon } from '../icons/chevron.svg';
import { useState } from "react";
import { isLevenshteinMatch } from "./utils/isLevenshteinMatch";

interface FilterOption {
  fieldId: string,
  value: string | number | boolean,
  label: string,
  onClick?: (filter: Filter, selected: boolean) => void,
  isSelected?: boolean
}

export interface FilterConfig {
  options: FilterOption[],
  searchable?: boolean,
  placeholderText?: string,
  label?: string,
  collapsible?: boolean,
  defaultExpanded?: boolean
}

interface FilterDisplayProps extends FilterConfig {
  customCssClasses?: FilterDisplayCssClasses,
  cssCompositionMethod?: CompositionMethod
}

const builtInCssClasses: FilterDisplayCssClasses = {
  label: 'text-gray-900 text-sm font-medium text-left',
  labelIcon: 'w-3',
  labelContainer: 'w-full flex justify-between items-center mb-4',
  optionsContainer: 'flex flex-col space-y-3',
}

export interface FilterDisplayCssClasses extends CheckboxOptionCssClasses {
  label?: string,
  labelIcon?: string,
  labelContainer?: string,
  optionsContainer?: string,
  searchableInputElement?: string
}

export default function FilterDisplay(props: FilterDisplayProps) {
  const {
    options: allOptions,
    label,
    searchable,
    collapsible,
    placeholderText = 'Search here...',
    defaultExpanded,
    customCssClasses,
    cssCompositionMethod
  } = props;
  const [ searchTerm, setSearchTerm ] = useState('');
  const options = searchable
    ? allOptions.filter(o => isLevenshteinMatch(o.label.toLowerCase(), searchTerm.toLowerCase()))
    : allOptions;
  const hasSelectedFilterOption = !!options.find(o => o.isSelected);
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
    defaultExpanded: hasSelectedFilterOption || defaultExpanded
  });
  const modifiedLabelIconCssClasses = isExpanded
    ? cssClasses.labelIcon
    : cssClasses.labelIcon + ' transform rotate-180';
 
  return (
    <fieldset>
      <button className={cssClasses.labelContainer} {...(collapsible ? getToggleProps() : {})}>
        <div className={cssClasses.label}>{label}</div>
        {collapsible && <DropdownIcon className={modifiedLabelIconCssClasses}/>}
      </button>
      <div {...(collapsible ? getCollapseProps() : {})}>
        {searchable 
          && <input
            className={cssClasses.searchableInputElement} 
            type='text' 
            placeholder={placeholderText} 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)}/>}
        <div className={cssClasses.optionsContainer}>
          {options.map((option, index) => {
            const filter = {
              fieldId: option.fieldId,
              matcher: Matcher.Equals,
              value: option.value
            }
            return renderCheckboxOption({
              option: { id: `${index}`, label: option.label },
              onClick: selected => option.onClick?.(filter, selected),
              selected: option.isSelected,
              cssClasses
            });
          })}
        </div>
      </div>
    </fieldset>
  );
}