import { Filters } from '@yext/answers-react-components';
import { ResponsiveDivider } from './ResponsiveDivider';

export default function Facets(): JSX.Element {
  return (
    <Filters.Facets>
      {facets => facets.map((f, i) => {
        if (f.options.length === 0) {
          return null;
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
            {(i < facets.length - 1) && <ResponsiveDivider />}
          </Filters.FilterGroup>
        )
      })}
    </Filters.Facets>
  )
}
