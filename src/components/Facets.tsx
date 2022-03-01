import { Filters } from '@yext/answers-react-components';
import { Fragment } from 'react';
import { hierarchicalFacetFieldIds } from '../config/answersHeadlessConfig';

export default function Facets(): JSX.Element {
  return (
    <Filters.Facets className='md:w-80'>
      {facets => facets.map((f, i) => {
        if (f.options.length === 0) {
          return null;
        }

        if (hierarchicalFacetFieldIds.includes(f.fieldId)) {
          return <Fragment key={f.fieldId}>
            <Filters.HierarchicalFacet facet={f} showMoreLimit={1}/>
            {(i < facets.length - 1) && <Filters.ResponsiveDivider />}
          </Fragment>
        }

        return (
          <Filters.FilterGroup key={f.fieldId}>
            <Filters.CollapsibleLabel label={f.displayName} />
            <Filters.CollapsibleSection>
              <Filters.SearchInput />
              {f.options.map(o =>
                <Filters.CheckboxOption
                  key={o.displayName}
                  value={o.value}
                  fieldId={f.fieldId}
                />
              )}
            </Filters.CollapsibleSection>
            {(i < facets.length - 1) && <Filters.ResponsiveDivider />}
          </Filters.FilterGroup>
        )
      })}
    </Filters.Facets>
  )
}

