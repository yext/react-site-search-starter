import VisualSearchBar from './VisualSearchBar';
import { AnswersHeadless, HighlightedFields, HighlightedValue, Result } from '@yext/answers-headless-react';
import EntityPreviews from './EntityPreviews';
import { ReactComponent as EventIcon } from '../../icons/event.svg';
import { ReactComponent as FAQIcon } from '../../icons/faq.svg';
import renderHighlightedValue from '../utils/renderHighlightedValue';

interface SampleVisualSearchBarProps { 
  verticalKeyToLabelMap?: Record<string, string>, 
  entityPreviewSearcher?: AnswersHeadless
}

/**
 * This is an example of how to use the VisualSearchBar component.
 */
export default function SampleVisualSearchBar(props: SampleVisualSearchBarProps) {
  const { verticalKeyToLabelMap, entityPreviewSearcher } = props;
  return (
    <VisualSearchBar
      placeholder='Search...'
      entityPreviewSearcher={entityPreviewSearcher}
      entityPreviewsDebouncingTime={100}
      verticalKeyToLabel={verticalKey => verticalKeyToLabelMap?.[verticalKey] ?? verticalKey }
      renderEntityPreviews={isLoading => (
        <div className={isLoading ? 'opacity-50' : ''}>
          <EntityPreviews verticalKey='events'>
            {results => (<>
              {results.length > 0 && <div className='h-px bg-gray-200 mt-1 mb-4 mx-3.5'></div>}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 mx-3.5 mt-1'>
                {results.map((r, index) => <EventCard result={r} key={`${index}-${r.name}`} />)}
              </div>
            </>
            )}
          </EntityPreviews>
          <EntityPreviews verticalKey='faqs' limit={2}>
            {results => (
              <div className='flex flex-col'>
                {results.map((r, index) => <FaqCard result={r} key={`${index}-${r.name}`} />)}
              </div>
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
    <div className='h-px bg-gray-200 mt-1 mb-4 mx-2.5'></div>
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