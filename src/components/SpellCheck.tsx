import { useAnswersState, useAnswersActions } from '@yext/answers-headless-react'
import classNames from 'classnames';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';

interface SpellCheckCssClasses {
  container?: string,
  helpText?: string,
  spellCheck___loading?: string,
  spellCheckLink?: string
}

const builtInCssClasses: SpellCheckCssClasses = {
  container: 'text-lg pt-3',
  helpText: 'text-gray-600',
  spellCheck___loading: 'opacity-50',
  spellCheckLink: 'text-blue-600 font-bold cursor-pointer hover:underline focus:underline'
}

interface Props {
  isVertical: boolean,
  customCssClasses?: SpellCheckCssClasses,
  cssCompositionMethod?: CompositionMethod
}

export default function SpellCheck ({ isVertical, customCssClasses, cssCompositionMethod }: Props): JSX.Element | null {
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  const correctedQuery = useAnswersState(state => state.spellCheck.correctedQuery);
  const isLoading = useAnswersState(state => state.searchStatus.isLoading);
  const spellCheckClassNames = cssClasses.spellCheck___loading
    ? classNames(cssClasses.container, { [cssClasses.spellCheck___loading]: isLoading })
    : cssClasses.container;
  const answersActions = useAnswersActions();
  if (!correctedQuery) {
    return null;
  }
  return (
    <div className={spellCheckClassNames}>
      <span className={cssClasses.helpText}>Did you mean </span>
      <button className={cssClasses.spellCheckLink} onClick={() => {
        answersActions.setQuery(correctedQuery);
        isVertical
          ? answersActions.executeVerticalQuery()
          : answersActions.executeUniversalQuery();
      }}>{correctedQuery}</button>
    </div>
  );
}