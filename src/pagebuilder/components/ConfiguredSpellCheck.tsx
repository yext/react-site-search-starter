import { default as SpellCheck } from '../../components/SpellCheck';
import spellCheckStyles from '../sass/SpellCheck.module.scss';

export default function ConfiguredSpellCheck() {
  return (
    <SpellCheck
      customCssClasses={{
        container: spellCheckStyles.SpellCheck__container,
        helpText: spellCheckStyles.SpellCheck__helpText,
        spellCheck___loading: spellCheckStyles.SpellCheck___loading,
        link: spellCheckStyles.SpellCheck__link
      }}
      cssCompositionMethod='replace'
    />
  );
}