import type { TEditor, TElement } from '@sewell_stephens/late-common';

import { findNodePath } from '@sewell_stephens/late-common/react';
import { Path } from 'slate';

/** Get table row index of a cell node. */
export const getTableRowIndex = (editor: TEditor, cellNode: TElement) => {
  const path = findNodePath(editor, cellNode);

  if (!path) return 0;

  const rowPath = Path.parent(path);

  return rowPath.at(-1)!;
};
