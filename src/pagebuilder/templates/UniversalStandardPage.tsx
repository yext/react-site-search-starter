import UniversalResults, { UniversalResultsConfig } from '../../components/UniversalResults';
import DirectAnswer from '../../components/DirectAnswer';
import ConfiguredSpellCheck from '../components/ConfiguredSpellCheck';
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
  const verticalKeyToLabelMap: Record<string, string> = Object.entries(answersAppContext.verticals)
    .reduce((map, [key, config]) => {
      map[key] = config.label ?? key
      return map;
    }, {} as Record<string, string>);
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
      <ConfiguredSpellCheck />
      <DirectAnswer />
      <UniversalResults
        verticalConfigs={universalResultsConfig}
      />
    </div>
  );
}