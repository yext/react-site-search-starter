import { CardComponent } from "../../models/cardComponent";
import ConfiguredStandardCard from "../components/ConfiguredStandardCard";

export enum CardTypes {
  Standard = 'Standard'
}

/**
 * Map card name to the corresponding React component.
 */
export const CardRegistry: Record<string, CardComponent> = {
  [CardTypes.Standard]: ConfiguredStandardCard
}
