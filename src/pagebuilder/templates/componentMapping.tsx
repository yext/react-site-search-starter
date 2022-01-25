import { StandardCard } from "../../components/cards/StandardCard";
import { CardComponent } from "../../models/cardComponent";

/**
 * Map card name to the corresponding React component.
 */
export const CardNameToComponentMap: Record<string, CardComponent> = {
  'STANDARD': StandardCard
}
