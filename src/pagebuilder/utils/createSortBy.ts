import { SortBy, SortType, Direction } from "@yext/answers-headless-react";
import { SortOption } from "../models/SortOption";

const typeMap = {
  'RELEVANCE': SortType.Relevance,
  'FIELD': SortType.Field,
  'ENTITY_DISTANCE': SortType.EntityDistance
};

const directionMap = {
  'ASC': Direction.Ascending,
  'DESC': Direction.Descending
};

/**
 * Creates a SortBy from a SortOption
 * @param sortOption 
 * @returns SortBy
 */
export function createSortBy (sortOption: SortOption): SortBy {
  return {
    type: typeMap[sortOption.type],
    ...(sortOption.direction && { direction: directionMap[sortOption.direction] }),
    ...(sortOption.field && { field: sortOption.field })
  }
}