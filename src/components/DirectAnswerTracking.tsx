import { useAnswersState } from '@yext/answers-headless-react';
import classNames from 'classnames';
import { useState } from 'react';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';

interface DirectAnswerTrackingProps {
  customCssClasses?: DirectAnswerTrackingCssClasses,
  cssCompositionMethod?: CompositionMethod
}

interface DirectAnswerTrackingCssClasses {
  container?: string,
  container___loading?: string,
  title?: string,
  description?: string
}

const builtInCssClasses: DirectAnswerTrackingCssClasses = {
  container: 'p-4 border rounded-lg shadow-sm',
  container___loading: 'opacity-50',
  title: 'mb-4 text-gray-500',
  description: 'font-bold text-xl text-gray-800'
};

export default function DirectAnswerTracking(props: DirectAnswerTrackingProps): JSX.Element | null {
  const query = useAnswersState(state => state.query.mostRecentSearch) ?? '';
  const isLoading = useAnswersState(state => state.searchStatus.isLoading || false);
  const cssClasses = useComposedCssClasses(builtInCssClasses, props.customCssClasses, props.cssCompositionMethod);

  const queryRulesData = useAnswersState(state => state.queryRules.actions);
  const trackingInfo = queryRulesData.find(action => action.key === 'trackingInfo')?.data;
  const apiUrl = typeof trackingInfo?.apiUrl === 'string' ? trackingInfo?.apiUrl : undefined;
  const [trackingResult, setTrackingResult] = useState<string>('');
  if (apiUrl) {
    fetch(apiUrl + query).then(res => res.json()).then(res => setTrackingResult(res.status.toString()));
  } else if (trackingResult) {
    setTrackingResult('');
    return null;
  }
  
  if (!trackingResult) {
    return null;
  }

  const containerCssClasses = classNames(cssClasses.container, {
    [cssClasses.container___loading ?? '']: isLoading
  });

  return (
    <div className={containerCssClasses}>
      <div className={cssClasses.title}>Tracking Status</div>
      <div className={cssClasses.description}>{trackingResult}</div>
    </div>
  )
}
