export interface SortOption {
  type: 'RELEVANCE' | 'FIELD' | 'ENTITY_DISTANCE',
  field?: string,
  direction?: 'ASC' | 'DESC'
}