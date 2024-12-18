import {
  type TEditor,
  type TElement,
  getParentNode,
} from '@sewell_stephens/late-common';
import { findNodePath } from '@sewell_stephens/late-common/react';

/** Get table column index of a cell node. */
export const getTableColumnIndex = (editor: TEditor, cellNode: TElement) => {
  const path = findNodePath(editor, cellNode);

  if (!path) return -1;

  const [trNode] = getParentNode(editor, path) ?? [];

  if (!trNode) return -1;

  let colIndex = -1;

  trNode.children.some((item, index) => {
    if (item === cellNode) {
      colIndex = index;

      return true;
    }

    return false;
  });

  return colIndex;
};
