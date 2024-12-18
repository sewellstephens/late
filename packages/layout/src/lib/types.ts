import type { TElement } from '@sewell_stephens/late-common';

export interface TColumnElement extends TElement {
  type: 'column';
  width: string;
  id?: string;
}

export interface TColumnGroupElement extends TElement {
  children: TColumnElement[];
  type: 'column_group';
  id?: string;
  layout?: number[];
}
