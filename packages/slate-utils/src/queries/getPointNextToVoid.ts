import {
  type TEditor,
  getPointAfter,
  getPointBefore,
  getVoidNode,
} from '@sewell_stephens/slate';
import { Path, type Point } from 'slate';

import { getBlockAbove } from './getBlockAbove';

/**
 * If the start point is inside an inline void, get the point before or after
 * it.
 */
export const getPointNextToVoid = (
  editor: TEditor,
  {
    after,
    at,
  }: {
    /** Get the point after (instead of before) the void node. */
    after?: boolean;
    at: Point;
  }
) => {
  const startVoid = getVoidNode(editor, { at, mode: 'highest' });

  if (startVoid) {
    const blockAbove = getBlockAbove(editor, { at });

    if (blockAbove) {
      const nextPoint = after
        ? getPointAfter(editor, at)
        : getPointBefore(editor, at);

      if (
        nextPoint &&
        blockAbove &&
        Path.isAncestor(blockAbove[1], nextPoint.path)
      ) {
        at = nextPoint;
      }
    }
  }

  return at;
};
