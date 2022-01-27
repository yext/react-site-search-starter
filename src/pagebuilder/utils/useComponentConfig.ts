import { useAnswersState } from "@yext/answers-headless-react";
import { useAnswersAppContext } from "../AnswersAppContext";
import ComponentConfig from "../models/ComponentConfig";

/**
 * Gets the config for a component based on the common and page specific configs
 * 
 * @remarks
 * Prioritizes the config specified by a particular vertical/universal page over the common config.
 * 
 * @param componentName 
 * @returns 
 */
export default function useComponentConfig<ComponentName extends keyof ComponentConfig>(componentName: ComponentName): ComponentConfig[ComponentName] {
  const answersAppContext = useAnswersAppContext();
  const verticalKey = useAnswersState(state => state.vertical.verticalKey);

  let pageSpecificConfig = verticalKey
    ? answersAppContext.verticals[verticalKey].components?.[componentName] ?? {}
    : answersAppContext.universal.components?.[componentName] ?? {}

  return {
    ...answersAppContext.common?.components?.[componentName],
    ...pageSpecificConfig
  }
}