import SearchBar from './SearchBar';
import { HighlightedFields, HighlightedValue, Result } from '@yext/answers-headless-react';
import EntityPreviews from './EntityPreviews';
import { universalResultsConfig } from '../config/universalResultsConfig';
import { ReactComponent as EventIcon } from '../icons/event.svg';
import { ReactComponent as FAQIcon } from '../icons/faq.svg';
import renderHighlightedValue from './utils/renderHighlightedValue';
import DropdownItem from './Dropdown/DropdownItem';

/**
 * This is an example of how to use the VisualSearchBar component.
 */
export default function SampleVisualSearchBar() {
  return (
    <SearchBar
      placeholder='Search...'
      entityPreviewsDebouncingTime={100}
      verticalKeyToLabel={verticalKey => universalResultsConfig[verticalKey]?.label ?? verticalKey}
      renderEntityPreviews={(isLoading, _results, onSubmit) => (
        <div className={isLoading ? 'opacity-50' : ''}>
          <EntityPreviews verticalKey='events'>
            {(results, _index) => (
              <div className='grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 mx-3.5 mt-1'>
                {results.map((r, index) =>
                  <DropdownItem
                    key={index}
                    className='hover:bg-gray-100 cursor-pointer'
                    focusedClassName='bg-gray-100'
                    value={r.name || ''}
                    itemData={{ verticalLink: `/events?query=${r.name}` }}
                    onClick={onSubmit}
                  >
                    <EventCard result={r} key={`${index}-${r.name}`} />
                  </DropdownItem>
                )}
              </div>
            )}
          </EntityPreviews>
          <EntityPreviews verticalKey='faqs' limit={2}>
            {(results, verticalIndex) => (<>
              <div className='flex flex-col'>
                {results.map((r, index) =>
                  <DropdownItem
                    key={index}
                    className='hover:bg-gray-100 cursor-pointer'
                    focusedClassName='bg-gray-100'
                    value={r.name || ''}
                    itemData={{ verticalLink: `/faqs?query=${r.name}` }}
                    onClick={onSubmit}
                  >
                    {(verticalIndex > 0 || index > 0) && <div className='h-px bg-gray-200 mt-1 mb-4 mx-3.5'></div>}
                    <FaqCard result={r} key={`${index}-${r.name}`} />
                  </DropdownItem>
                )}
              </div>
            </>
            )}
          </EntityPreviews>
        </div>
      )}
    />
  )
}

interface CardProps {
  result: Result
}

interface FaqData {
  question?: string,
  answer?: string
}

function FaqCard({ result }: CardProps) {
  const faqData: FaqData = result.rawData;

  function containsNameHighlightedValue(highlightedFields?: HighlightedFields): highlightedFields is { name: HighlightedValue } {
    const anyHiglightedFields = highlightedFields as any;
    return anyHiglightedFields.name?.value && anyHiglightedFields.name?.matchedSubstrings;
  }

  const matchedSubstrings = containsNameHighlightedValue(result.highlightedFields)
    ? result.highlightedFields.name.matchedSubstrings
    : [];

  return (<div key={faqData.question}>
    <div tabIndex={0} className='flex flex-row mx-4 mb-3 rounded-md'>
      <FAQIcon className='w-6 mr-3 mt-1'/>
      <div>
        <div className='text-gray-800 text-lg font-semibold pb-1'>{renderHighlightedValue({ value: faqData.question, matchedSubstrings }, { highlighted: 'font-normal' })}</div>
        <div className='font-normal text-base text-gray-500' >{faqData.answer}</div>
      </div>
    </div>
  </div>)
}

interface EventData {
  venueName?: string
}

function EventCard({ result }: CardProps) {
  const eventData: EventData = result.rawData;
  const venueName = eventData.venueName;
  return (
    <div tabIndex={0} className='flex flex-row border rounded-xl p-3 text-lg shadow-sm'>
      <EventIcon className='mr-3.5 mt-1 ml-1'/>
      <div>
        <div className='text-gray-800 font-medium pb-1 w-full'>{result.name}</div>
        <div className='text-base text-gray-500'>{venueName}</div>
      </div>
    </div>
  )
}