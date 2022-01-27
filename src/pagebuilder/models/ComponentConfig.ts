import { FieldMapping } from "../../components/utils/collectData";

interface SearchBarConfig {
  placeholder?: string
}

interface StandardCardConfig {
  fieldMappings?: {
    title?: FieldMapping,
    description?: FieldMapping,
    cta1?: FieldMapping,
    cta2?: FieldMapping
  }
}

export default interface ComponentConfig {
  searchBar?: SearchBarConfig,
  standardCard?: StandardCardConfig
}