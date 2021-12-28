import { useAnswersUtilities, DisplayableFacet, DisplayableFacetOption } from '@yext/answers-headless-react'
import { useState } from 'react';
import useCollapse from 'react-collapsed';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import renderCheckboxOption, { CheckboxOptionCssClasses } from './utils/renderCheckboxOption';

export type onFacetChangeFn = (fieldId: string, option: DisplayableFacetOption) => void

export interface FacetConfig {
  searchable?: boolean,
  placeholderText?: string,
  label?: string,
  collapsible?: boolean,
  defaultExpanded?: boolean
}

interface FacetProps extends FacetConfig {
  facet: DisplayableFacet,
  onToggle: onFacetChangeFn,
  customCssclasses?: FacetCssClasses,
  cssCompositionMethod?: CompositionMethod
}

export interface FacetCssClasses extends CheckboxOptionCssClasses {
  facetLabel?: string,
  optionsContainer?: string,
  searchableInputElement?: string
}

const builtInCssClasses: FacetCssClasses = {
  facetLabel: 'text-gray-900 text-sm font-medium mb-4',
  optionsContainer: 'flex flex-col space-y-3',
}

export default function Facet(props: FacetProps): JSX.Element {
  const { 
    facet,
    onToggle,
    searchable,
    collapsible,
    defaultExpanded,
    label,
    placeholderText='Search here...',
    customCssclasses,
    cssCompositionMethod 
  } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssclasses, cssCompositionMethod);
  const answersUtilities = useAnswersUtilities();
  const hasSelectedFacet = !!facet.options.find(o => o.selected);
  const [ filterValue, setFilterValue ] = useState('');
  const { getCollapseProps, getToggleProps } = useCollapse({
    defaultExpanded: hasSelectedFacet || defaultExpanded
  });

  const facetOptions = searchable
    ? answersUtilities.searchThroughFacet(facet, filterValue).options
    : facet.options;

  return (
    <fieldset>
      <button className={cssClasses.facetLabel} {...(collapsible ? getToggleProps() : {})}>
        {label || facet.displayName} 
      </button>
      <div {...(collapsible ? getCollapseProps() : {})}>
        {searchable 
          && <input
            className={cssClasses.searchableInputElement} 
            type='text' 
            placeholder={placeholderText} 
            value={filterValue} 
            onChange={e => setFilterValue(e.target.value)}/>}
        <div className={cssClasses.optionsContainer}>
          {facetOptions.map(option => 
            renderCheckboxOption({
              option: { id: option.displayName, label: `${option.displayName} (${option.count})` },
              optionHandler: () => onToggle(facet.fieldId, option)
            })
          )}
        </div>
      </div>
    </fieldset>
  )
}
