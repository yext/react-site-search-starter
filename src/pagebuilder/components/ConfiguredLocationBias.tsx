import { default as LocationBias } from '../../components/LocationBias';
import locationBiasStyles from '../sass/LocationBias.module.scss';

export default function ConfiguredLocationBias() {
  return (
    <LocationBias
      customCssClasses={locationBiasStyles}
      cssCompositionMethod='replace'
    />
  );
}