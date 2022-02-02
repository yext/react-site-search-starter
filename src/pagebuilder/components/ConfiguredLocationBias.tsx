import { default as LocationBias } from '../../components/LocationBias';
import locationBiasStyles from '../sass/LocationBias.module.scss';

export default function ConfiguredLocationBias() {
  return (
    <LocationBias
      customCssClasses={{
        container: locationBiasStyles.LocationBias__container,
        location: locationBiasStyles.LocationBias__location,
        button: locationBiasStyles.LocationBias__button
      }}
      cssCompositionMethod='replace'
    />
  );
}