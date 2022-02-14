import { Filters } from '@yext/answers-react-components';
import ResponsiveDivider from './ResponsiveDivider';

export default function Facets(): JSX.Element {
  return (
    <Filters.Facets>
      {facets => facets.map((f, i) =>
        <Filters.Group key={i}>
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
          {(i < facets.length - 1) && <ResponsiveDivider />}
        </Filters.Group>
      )}
    </Filters.Facets>
  )
}
