import { StandardCard } from "../../components/cards/StandardCard";
import { CardComponent } from "../../models/cardComponent";

export enum CardTypes {
  Standard = 'Standard'
}

/**
 * Map card name to the corresponding React component.
 */
export const CardRegistry: Record<string, CardComponent> = {
  [CardTypes.Standard]: StandardCard
}
