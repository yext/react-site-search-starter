import { get } from 'lodash';

/**
 * Collects raw data based on the provided data mappings
 * 
 * @remarks
 * If rawData is { faq: { question: 'What is Yext?', answer: 'An AI search platform' } }, and the
 * dataMappings are { question: 'faq.question', answer: 'faq.answer' },
 * then the function will return { question: 'What is Yext?, answer: 'An AI search platform' }
 * 
 * @param rawData The rawData from an {@link Result}
 * @param dataMappings Indicates where data is located within the rawData field
 * @returns An object of fields to data
 */
export function collectData<DataStructure extends Partial<Record<string, string>> | undefined> (
  rawData: Record<string, unknown>,
  dataMappings: DataStructure,
) : Record<string, any> {

  if (!dataMappings) {
    return {}
  }

  return Object.entries(dataMappings as Record<string, any>)
    .reduce((acc: Record<string, any>, [field, mapping]) => {
      acc[field] = get(rawData, mapping);
      return acc;
    }, {});
}