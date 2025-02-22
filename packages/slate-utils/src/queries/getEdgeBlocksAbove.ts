import {
  type AncestorOf,
  type GetAboveNodeOptions,
  type TEditor,
  type TNodeEntry,
  getEdgePoints,
} from '@sewell_stephens/slate';

import { getBlockAbove } from './getBlockAbove';

/** Get the edge blocks above a location (default: selection). */
export const getEdgeBlocksAbove = <
  N1 extends AncestorOf<E>,
  N2 extends AncestorOf<E> = N1,
  E extends TEditor = TEditor,
>(
  editor: E,
  { at: _at, ...options }: GetAboveNodeOptions<E> = {}
): [TNodeEntry<N1>, TNodeEntry<N2>] | null => {
  const at = _at ?? editor.selection;

  if (!at) return null;

  const [start, end] = getEdgePoints(editor, at ?? editor.selection);

  const startBlock = getBlockAbove<N1>(editor, {
    at: start,
    ...options,
  });

  if (!startBlock) return null;

  const endBlock = getBlockAbove<N2>(editor, {
    at: end,
    ...options,
  });

  if (!endBlock) return null;

  return [startBlock, endBlock];
};
