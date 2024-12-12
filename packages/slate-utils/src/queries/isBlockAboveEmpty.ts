import type { TEditor } from '@sewellstephens/slate';

import { getBlockAbove } from './getBlockAbove';
import { isAncestorEmpty } from './isAncestorEmpty';

/** Is the block above the selection empty. */
export const isBlockAboveEmpty = (editor: TEditor) => {
  const block = getBlockAbove(editor)?.[0];

  if (!block) return false;

  return isAncestorEmpty(editor, block);
};
