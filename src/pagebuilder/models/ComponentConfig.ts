import { FieldData } from "../../components/utils/applyFieldMappings";

interface SearchBarConfig {
  placeholder?: string
}

interface StandardCardConfig {
  fieldMappings?: {
    title?: FieldData,
    description?: FieldData,
    cta1?: FieldData,
    cta2?: FieldData
  }
}

export default interface ComponentConfig {
  searchBar?: SearchBarConfig,
  standardCard?: StandardCardConfig
}