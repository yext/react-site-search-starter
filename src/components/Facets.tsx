import CollapsibleLabel from './Filters/CollapsibleLabel';
import CheckboxOption from './Filters/CheckboxOption';
import CollapsibleSection from './Filters/CollapsibleSection';
import { default as BaseFacets } from './Filters/Facets';
import Group from './Filters/Group';
import SearchInput from './Filters/SearchInput';
import ResponsiveDivider from './ResponsiveDivider';

export default function Facets(): JSX.Element {
  return (
    <BaseFacets>
      {facets => facets.map((f, i) =>
        <Group key={i}>
          <CollapsibleLabel>{f.displayName}</CollapsibleLabel>
          <CollapsibleSection>
            <SearchInput />
            {f.options.map(o => <CheckboxOption key={o.displayName} value={o.value} fieldId={f.fieldId} />)}
          </CollapsibleSection>
          {(i < facets.length - 1) && <ResponsiveDivider />}
        </Group>
      )}
    </BaseFacets>
  )
}
