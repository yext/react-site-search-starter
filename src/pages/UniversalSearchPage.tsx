import UniversalResults from '../components/UniversalResults';
import DirectAnswer from '../components/DirectAnswer';
import { UniversalResultsConfig } from '../config/universalResultsConfig';
import SpellCheck from '../components/SpellCheck';
import useInitialSearch from '../hooks/useInitialSearch';

const universalResultsFilterConfig = {
  show: true
};

export default function UniversalSearchPage(props: { universalResultsConfig: UniversalResultsConfig}) {
  const { universalResultsConfig } = props;
  useInitialSearch();

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