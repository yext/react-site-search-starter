import UniversalResults, { UniversalResultsConfig } from '../components/UniversalResults';
import DirectAnswer from '../components/DirectAnswer';
import SpellCheck from '../components/SpellCheck';
import usePageSetupEffect from '../hooks/usePageSetupEffect';

const universalResultsFilterConfig = {
  show: true
};

export default function UniversalSearchPage(props: { universalResultsConfig: UniversalResultsConfig}) {
  const { universalResultsConfig } = props;
  usePageSetupEffect();

  return (
    <div>
      <SpellCheck />
      <DirectAnswer />
      <UniversalResults
        appliedFiltersConfig={universalResultsFilterConfig}
        verticalConfigs={universalResultsConfig}
      />
    </div>
  );
}