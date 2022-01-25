import UniversalResults, { UniversalResultsConfig } from '../../components/UniversalResults';
import DirectAnswer from '../../components/DirectAnswer';
import SpellCheck from '../../components/SpellCheck';
import usePageSetupEffect from '../../hooks/usePageSetupEffect';
import Navigation, { LinkData } from '../../components/Navigation';
import { useAnswersAppContext } from '../AnswersAppContext';
import SampleVisualSearchBar from '../../components/VisualAutocomplete/SampleVisualSearchBar';
import useEntityPreviewSearcher from '../../hooks/useEntityPreviewSearcher';

interface UniversalStandardPageProps {
  universalResultsConfig: UniversalResultsConfig,
  navLinks: LinkData[]
}

export default function UniversalStandardPage(props: UniversalStandardPageProps) {
  const { universalResultsConfig, navLinks } = props;
  usePageSetupEffect();
  const answersAppContext = useAnswersAppContext();
  const verticalKeyToLabelMap: Record<string, string> = {};
  Object.entries(answersAppContext.verticals)
    .forEach(([key, config]) => { verticalKeyToLabelMap[key] = config.label ?? key })
  const entityPreviewSearcher = useEntityPreviewSearcher(
    { ...answersAppContext.providerConfig, headlessId: 'visual-autocomplete' }
  );
  return (
    <div>
      <SampleVisualSearchBar
        verticalKeyToLabelMap={verticalKeyToLabelMap}
        entityPreviewSearcher={entityPreviewSearcher}
      />
      <Navigation links={navLinks || []} />
      <SpellCheck />
      <DirectAnswer />
      <UniversalResults
        verticalConfigs={universalResultsConfig}
      />
    </div>
  );
}