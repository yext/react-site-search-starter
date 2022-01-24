import UniversalResults, { UniversalResultsConfig } from '../../components/UniversalResults';
import DirectAnswer from '../../components/DirectAnswer';
import SpellCheck from '../../components/SpellCheck';
import usePageSetupEffect from '../../hooks/usePageSetupEffect';
import Navigation, { LinkData } from '../../components/Navigation';
import { useAnswersAppContext } from '../AnswersAppContext';
import SampleVisualSearchBar from '../../components/VisualAutocomplete/SampleVisualSearchBar';

export default function UniversalStandardPage(props: { universalResultsConfig: UniversalResultsConfig, navLinks: LinkData[] }) {
  const { universalResultsConfig, navLinks } = props;
  usePageSetupEffect();
  const answersAppContext = useAnswersAppContext();
  const verticalKeyToLabelMap: Record<string, string> = {};
  Object.entries(answersAppContext.verticals)
    .forEach(([key, config]) => { verticalKeyToLabelMap[key] = config.label ?? key })
  const entityPreviewHeadlessConfig = { ...answersAppContext.providerConfig, headlessId: 'visual-autocomplete' }
  return (
    <div>
      <SampleVisualSearchBar verticalKeyToLabelMap={verticalKeyToLabelMap} entityPreviewHeadlessConfig={entityPreviewHeadlessConfig}/>
      <Navigation links={navLinks || []} />
      <SpellCheck />
      <DirectAnswer />
      <UniversalResults
        verticalConfigs={universalResultsConfig}
      />
    </div>
  );
}