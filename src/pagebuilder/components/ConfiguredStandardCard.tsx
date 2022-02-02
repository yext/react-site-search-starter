import { StandardCard, StandardCardProps } from '../../components/cards/StandardCard';
import useComponentConfig from '../utils/useComponentConfig';
import standardCardStyles from '../sass/StandardCard.module.scss';
import { CompositionMethod } from '../../hooks/useComposedCssClasses';

export default function ConfiguredStandardCard(props: StandardCardProps) {
  const cardConfig = useComponentConfig('standardCard');
  const cssClasses = {
    container: standardCardStyles.StandardCard__container,
    header: standardCardStyles.StandardCard__header,
    body: standardCardStyles.StandardCard__body,
    descriptionContainer: standardCardStyles.StandardCard__descriptionContainer,
    ctaContainer: standardCardStyles.StandardCard__ctaContainer,
    cta1: standardCardStyles.StandardCard__cta1,
    cta2: standardCardStyles.StandardCard__cta2,
    ordinal: standardCardStyles.StandardCard__ordinal,
    title: standardCardStyles.StandardCard__title
  }
  const cssCompositionMethod: CompositionMethod = 'replace';

  const updatedProps = {
    ...props,
    ...cardConfig,
    customCssClasses: cssClasses,
    cssCompositionMethod
  }

  return <StandardCard {...updatedProps} />
}