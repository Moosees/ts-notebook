export type CellTypes = 'code' | 'text';
export type MoveDirections = 'up' | 'down';

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}
