import { default as SpellCheck } from '../../components/SpellCheck';
import spellCheckStyles from '../sass/SpellCheck.module.scss';

export default function ConfiguredSpellCheck() {
  return (
    <SpellCheck
      customCssClasses={spellCheckStyles}
      cssCompositionMethod='replace'
    />
  );
}