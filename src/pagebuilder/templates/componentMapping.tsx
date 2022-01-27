import { CardComponent } from "../../models/cardComponent";
import ConfiguredStandardCard from "../components/ConfiguredStandardCard";

/**
 * Map card name to the corresponding React component.
 */
export const CardNameToComponentMap: Record<string, CardComponent> = {
  'STANDARD': ConfiguredStandardCard
}
