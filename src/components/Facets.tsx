import { Filters } from '@yext/answers-react-components';

export default function Facets(): JSX.Element {
  return (
    <Filters.Facets>
      {facets => facets.map((f, i) =>
        <Filters.FilterGroup key={i}>
          <Filters.CollapsibleLabel>{f.displayName}</Filters.CollapsibleLabel>
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
      )}
    </Filters.Facets>
  )
}
