import type { TEditor, TElement } from '@sewellstephens/plate-common';

import { findNodePath } from '@sewellstephens/plate-common/react';
import { Path } from 'slate';

/** Get table row index of a cell node. */
export const getTableRowIndex = (editor: TEditor, cellNode: TElement) => {
  const path = findNodePath(editor, cellNode);

  if (!path) return 0;

  const rowPath = Path.parent(path);

  return rowPath.at(-1)!;
};
