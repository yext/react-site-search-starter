import { useAnswersState, DirectAnswerType, DirectAnswer as DirectAnswerModel } from '@yext/answers-headless-react';
import renderHighlightedValue from './utils/renderHighlightedValue';
import classNames from 'classnames';
import { ReactNode } from 'react';

interface DirectAnswerProps {
  cssClasses?: DirectAnswerCssClasses
}

interface DirectAnswerCssClasses {
  container?: string,
  containerLoading?: string,
  fieldValueTitle?: string,
  featuredSnippetTitle?: string,
  content?: string,
  fieldValueDescription?: string,
  featuredSnippetDescription?: string,
  viewDetailsLink?: string,
  viewDetailsLinkContainer?: string,
  highlighted?: string
}

const defaultCSSClasses: DirectAnswerCssClasses = {
  container: 'p-4 border border-color-zinc-200',
  containerLoading: 'opacity-50',
  fieldValueTitle: 'mb-4 text-gray-500',
  featuredSnippetTitle: 'mb-4 font-bold text-xl',
  content: '',
  fieldValueDescription: 'font-bold text-xl',
  featuredSnippetDescription: '',
  viewDetailsLink: 'text-blue-600',
  viewDetailsLinkContainer: 'pt-4',
  highlighted: 'bg-blue-100'
};

export default function DirectAnswer(props: DirectAnswerProps): JSX.Element | null {
  const directAnswerResult = useAnswersState(state => state.directAnswer.result);
  console.log(directAnswerResult)
  const isLoading = useAnswersState(state => state.searchStatus.isLoading || false);
  if (!directAnswerResult) {
    return null;
  }
  const cssClasses = getCssClasses(props.cssClasses, isLoading, directAnswerResult);
  const title = directAnswerResult.type === DirectAnswerType.FeaturedSnippet
    ? directAnswerResult.value
    : `${directAnswerResult.entityName} / ${directAnswerResult.fieldName}`
  const description: ReactNode = directAnswerResult.type === DirectAnswerType.FeaturedSnippet 
    ? renderHighlightedValue(directAnswerResult.snippet, { highlighted: cssClasses.highlighted })
    : directAnswerResult.value;
  const link = directAnswerResult.relatedResult.link;

  function getLinkText(directAnswerResult: DirectAnswerModel) {
    const isSnippet = directAnswerResult.type === DirectAnswerType.FeaturedSnippet;
    const name = directAnswerResult.relatedResult.name;
    if (isSnippet && name) {
      return <>
        Read more about <a className={cssClasses.viewDetailsLink} href={link}>
          {directAnswerResult.relatedResult.name}
        </a>
      </>
    } else if (!isSnippet && link) {
      return <a href={link} className={cssClasses.viewDetailsLink}>View Details</a>
    }
  }

  return (
    <div className={cssClasses.container}>
      {title &&
        <div className={cssClasses.title}>{title}</div>}
      <div className={cssClasses.content}>
        <div className={cssClasses.description}>{description}</div>
        {link && 
          <div className={cssClasses.viewDetailsLinkContainer}>
            {getLinkText(directAnswerResult)}
          </div>
        }
      </div>
    </div>
  )
}

function getCssClasses(
  customCssClasses: DirectAnswerCssClasses | undefined,
  isLoading: boolean,
  directAnswerResult: DirectAnswerModel
) {
  const cssClasses = Object.assign(defaultCSSClasses, customCssClasses);
  const containerCssClasses = classNames(cssClasses.container, { [cssClasses.containerLoading || '']: isLoading });
  const isSnippet = directAnswerResult.type === DirectAnswerType.FeaturedSnippet;
  return {
    container: containerCssClasses,
    title: isSnippet ? cssClasses.featuredSnippetTitle : cssClasses.fieldValueTitle,
    content: cssClasses.content,
    description: isSnippet ? cssClasses.featuredSnippetDescription : cssClasses.fieldValueDescription,
    viewDetailsLinkContainer: cssClasses.viewDetailsLinkContainer,
    viewDetailsLink: cssClasses.viewDetailsLink,
    highlighted: cssClasses.highlighted
  }
}
