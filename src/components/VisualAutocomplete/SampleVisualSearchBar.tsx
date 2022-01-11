import VisualSearchBar from './VisualSearchBar';
import { Result } from '@yext/answers-headless-react';
import EntityPreviews from './EntityPreviews';
import { universalResultsConfig } from '../../config/universalResultsConfig';

/**
 * This is an example of how to use the VisualSearchBar component.
 */
export default function SampleVisualSearchBar() {
  return (
    <VisualSearchBar
      placeholder='Search...'
      headlessId='visual-autocomplete'
      entityPreviewsDebouncingTime={100}
      verticalKeyToLabel={verticalKey => universalResultsConfig[verticalKey]?.label ?? verticalKey}
      renderEntityPreviews={isLoading => (
        <div className={isLoading ? 'opacity-50' : ''}>
          <EntityPreviews verticalKey='events'>
            {results => (
              <div className='flex ml-4 mt-1'>
                {results.map((r, index) => <EventCard result={r} key={`${index}-${r.name}`} />)}
              </div>
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
  return (<div key={faqData.question}>
    <div className='h-px bg-gray-200 mt-1 mb-3 mx-2.5'></div>
    <div tabIndex={0} className='flex flex-col mx-4 mb-3 rounded-md'>
      <div className='text-gray-900 text-lg font-medium pb-1'>{faqData.question}</div>
      <div>{faqData.answer}</div>
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
    <div tabIndex={0} className='flex flex-col mb-3 mr-4 border rounded-md p-3 text-lg'>
      <div className='font-medium pb-1'>{result.name}</div>
      <div className='text-base'>{venueName}</div>
    </div>
  )
}