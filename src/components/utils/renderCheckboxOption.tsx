interface CheckboxOption {
  id: string,
  label: string
}

export interface CheckboxOptionCssClasses {
  option?: string,
  optionLabel?: string,
  optionInput?: string
}

interface CheckBoxOptionProps {
  option: CheckboxOption,
  optionHandler: (isChecked: boolean) => void,
  selected?: boolean,
  customCssClasses?: CheckboxOptionCssClasses
}

const builtInCssClasses: CheckboxOptionCssClasses = {
  option: 'flex items-center space-x-3',
  optionInput: 'w-3.5 h-3.5 form-checkbox border border-gray-300 rounded-sm text-blue-600 focus:ring-blue-500',
  optionLabel: 'text-gray-600 text-sm font-normal'
}

export default function renderCheckboxOption({
  option, selected, optionHandler, customCssClasses
}: CheckBoxOptionProps) {
  const cssClasses = { ...builtInCssClasses, ...customCssClasses };
  return (
    <div className={cssClasses.option} key={option.id}>
      <input 
        type="checkbox"
        id={option.id}
        checked={selected}
        className={cssClasses.optionInput}
        onChange={evt => optionHandler(evt.target.checked)}
      />
      <label className={cssClasses.optionLabel} htmlFor={option.id}>{option.label}</label>
    </div>
  );
}
