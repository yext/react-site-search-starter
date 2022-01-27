export default interface ComponentConfig {
  searchBar?: {
    placeholder?: string
  },
  standardCard?: {
    dataMappings?: {
      title?: string,
      description?: string,
      cta1?: string,
      cta2?: string
    }
  }
}