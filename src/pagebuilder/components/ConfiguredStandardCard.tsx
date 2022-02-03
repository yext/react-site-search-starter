import { StandardCard, StandardCardProps } from '../../components/cards/StandardCard';
import useComponentConfig from '../utils/useComponentConfig';
import standardCardStyles from '../sass/StandardCard.module.scss';
import { CompositionMethod } from '../../hooks/useComposedCssClasses';

export default function ConfiguredStandardCard(props: StandardCardProps) {
  const cardConfig = useComponentConfig('standardCard');
  const cssCompositionMethod: CompositionMethod = 'replace';

  const updatedProps = {
    ...props,
    ...cardConfig,
    customCssClasses: standardCardStyles,
    cssCompositionMethod
  }

  return <StandardCard {...updatedProps} />
}