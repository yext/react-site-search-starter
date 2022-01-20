import { Result } from '@yext/answers-headless-react';
import { StandardCard, StandardCardConfig } from '../components/cards/StandardCard';

/**
 * The config types for each supported card.
 */
export type CardConfigTypes = StandardCardConfig;

/**
 * Map card name to the corresponding React component.
 */
export const CardNameToComponentMapping: Record<string, CardComponent> = {
  'STANDARD': StandardCard
}

/**
 * CardComponent and the corresponding config options
 */
export interface CardConfig extends CardConfigTypes {
  CardComponent: CardComponent
}

/**
 * The props provided to every {@link CardComponent).
 */
export interface CardProps {
  result: Result,
  configuration: CardConfigTypes
}

/**
 * A functional component that can be used to render a result card.
 */
export type CardComponent = (props: CardProps) => JSX.Element;