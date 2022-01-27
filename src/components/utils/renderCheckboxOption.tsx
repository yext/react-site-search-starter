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
  onClick: (isChecked: boolean) => void,
  selected?: boolean,
  customCssClasses?: CheckboxOptionCssClasses
}

export const builtInCssClasses: CheckboxOptionCssClasses = {
  option: 'flex items-center space-x-3',
  optionInput: 'w-3.5 h-3.5 form-checkbox cursor-pointer border border-gray-300 rounded-sm text-blue-600 focus:ring-blue-500',
  optionLabel: 'text-gray-500 text-sm font-normal cursor-pointer'
}

export default function renderCheckboxOption({
  option, selected, onClick, customCssClasses = {}
}: CheckBoxOptionProps) {
  return (
    <div className={customCssClasses.option} key={option.id}>
      <input 
        type="checkbox"
        id={option.id}
        checked={selected}
        className={customCssClasses.optionInput}
        onChange={evt => onClick(evt.target.checked)}
      />
      <label className={customCssClasses.optionLabel} htmlFor={option.id}>{option.label}</label>
    </div>
  );
}
