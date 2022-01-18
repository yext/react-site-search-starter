// import { ReactComponent as YextLogoIcon } from '../icons/yext_logo.svg';
// import '../sass/Autocomplete.scss';
// import { DropdownSectionCssClasses } from './DropdownSection';
// import { processTranslation } from './utils/processTranslation';
// import SearchButton from './SearchButton';
// import { useSynchronizedRequest } from '../hooks/useSynchronizedRequest';
// import useSearchWithNearMeHandling from '../hooks/useSearchWithNearMeHandling';
// import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';

// import Dropdown from './Dropdown/Dropdown';
// import DropdownInput from './Dropdown/DropdownInput';
// import DropdownItem from './Dropdown/DropdownItem';
// import DropdownMenu from './Dropdown/DropdownMenu';
// import classNames from 'classnames';

// import renderAutocompleteResult, {
//   AutocompleteResultCssClasses,
//   builtInCssClasses as AutocompleteResultBuiltInCssClasses
// } from './utils/renderAutocompleteResult';
// import { InputDropdownCssClasses } from './InputDropdown';

// import { ReactComponent as MagnifyingGlassIcon } from '../icons/magnifying_glass.svg';
export const bob = 15;
// export interface SearchBarCssClasses
//   extends InputDropdownCssClasses, DropdownSectionCssClasses, AutocompleteResultCssClasses {
//   container?: string,
//   inputDropdownContainer?: string,
//   resultIconContainer?: string,
//   submitButton?: string
// }

// const SCREENREADER_INSTRUCTIONS = 'When autocomplete results are available, use up and down arrows to review and enter to select.'

// export const builtInCssClasses: SearchBarCssClasses = {
//   container: 'h-12 mb-3',
//   divider: 'border-t border-gray-200 mx-2.5',
//   dropdownContainer: 'relative bg-white pt-4 pb-3 z-10',
//   inputContainer: 'inline-flex items-center justify-between w-full',
//   inputDropdownContainer: 'bg-white border rounded-3xl border-gray-200 w-full overflow-hidden',
//   inputDropdownContainer___active: 'shadow-lg',
//   inputElement: 'outline-none flex-grow border-none h-full pl-0.5 pr-2',
//   logoContainer: 'w-7 mx-2.5 my-2',
//   optionContainer: 'flex items-stretch mb-3 mx-3.5 cursor-pointer',
//   resultIconContainer: 'opacity-20 w-7 h-7 pl-1 mr-4',
//   searchButtonContainer: ' w-8 h-full mx-2 flex flex-col justify-center items-center',
//   submitButton: 'h-7 w-7',
//   focusedOption: 'bg-gray-100',
//   ...AutocompleteResultBuiltInCssClasses
// }

// interface Props {
//   placeholder?: string,
//   customCssClasses?: SearchBarCssClasses,
//   cssCompositionMethod?: CompositionMethod
// }

// export default function SearchBarDisplay() {
//   const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);

//   const screenReaderText = processTranslation({
//     phrase: `${numItems} autocomplete option found.`,
//     pluralForm: `${numItems} autocomplete options found.`,
//     count: numItems
//   });

//   function renderSearchButton() {
//     return (
//       <div className={cssClasses.searchButtonContainer}>
//         <SearchButton
//           className={cssClasses.submitButton}
//           handleClick={executeQuery}
//           isLoading={isLoading || false}
//         />
//       </div>
//     );
//   }

//   return (
//     <Dropdown
//       className={cssClasses.inputDropdownContainer}
//       activeClassName={classNames(cssClasses.inputDropdownContainer, cssClasses.inputDropdownContainer___active )}
//       numItems={numItems}
//       onSelect={() => {
//         autocompletePromiseRef.current = undefined;
//         executeQuery();
//       }}
//     >
//       <div className={cssClasses?.inputContainer}>
//         <div className={cssClasses.logoContainer}>
//           <YextLogoIcon />
//         </div>
//         <DropdownInput
//           className={cssClasses.inputElement}
//           onSubmit={() => executeQuery()}
//           onFocus={() => {
//             autocompletePromiseRef.current = executeAutocomplete()
//           }}
//           onType={value => {
//             answersActions.setQuery(value || '');
//             autocompletePromiseRef.current = executeAutocomplete();
//           }}
//         />
//         {renderSearchButton()}
//       </div>
//       <div className={cssClasses.optionsContainer}>
//         <DropdownMenu>
//           {
//             autocompleteResponse?.results.map((result, i) => {
//               return (
//                 <DropdownItem
//                   key={result.value}
//                   index={i}
//                   className={cssClasses.optionContainer}
//                   focusedClassName={cssClasses.optionContainer + ' ' + cssClasses.focusedOption}
//                   value={result.value}
//                 >
//                   {renderAutocompleteResult(result, cssClasses, MagnifyingGlassIcon)}
//                 </DropdownItem>
//               )
//             })
//           }
//         </DropdownMenu>
//       </div>
//     </Dropdown>
//   );
// }