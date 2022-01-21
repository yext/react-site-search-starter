import { useAnswersState, useAnswersActions, SearchTypeEnum } from '@yext/answers-headless-react'
import classNames from 'classnames';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';

interface SpellCheckCssClasses {
  container?: string,
  helpText?: string,
  spellCheck___loading?: string,
  link?: string
}

const builtInCssClasses: SpellCheckCssClasses = {
  container: 'text-lg pb-3',
  helpText: 'text-gray-600',
  spellCheck___loading: 'opacity-50',
  link: 'text-blue-600 font-bold cursor-pointer hover:underline focus:underline'
}

interface Props {
  customCssClasses?: SpellCheckCssClasses,
  cssCompositionMethod?: CompositionMethod
}

export default function SpellCheck ({ customCssClasses, cssCompositionMethod }: Props): JSX.Element | null {
  const isVertical = useAnswersState(s => s.meta.searchType) === SearchTypeEnum.Vertical;
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  const correctedQuery = useAnswersState(state => state.spellCheck.correctedQuery);
  const isLoading = useAnswersState(state => state.searchStatus.isLoading);
  const containerClassNames = classNames(cssClasses.container, {
    [cssClasses.spellCheck___loading ?? '']: isLoading
  });
  const answersActions = useAnswersActions();
  if (!correctedQuery) {
    return null;
  }
  return (
    <div className={containerClassNames}>
      <span className={cssClasses.helpText}>Did you mean </span>
      <button className={cssClasses.link} onClick={() => {
        answersActions.setQuery(correctedQuery);
        isVertical
          ? answersActions.executeVerticalQuery()
          : answersActions.executeUniversalQuery();
      }}>{correctedQuery}</button>
    </div>
  );
}