import { type SlateEditor, getAboveNode } from '@sewell_stephens/late-common';
import { Path } from 'slate';

import { ListItemPlugin } from '../ListPlugin';
import { getListTypes } from './getListTypes';

/**
 * Find the highest end list that can be deleted. Its path should be different
 * to diffListPath. If the highest end list 2+ items, return liPath. Get the
 * parent list until:
 *
 * - The list has less than 2 items.
 * - Its path is not equals to diffListPath.
 */
export const getHighestEmptyList = (
  editor: SlateEditor,
  {
    diffListPath,
    liPath,
  }: {
    diffListPath?: Path;
    liPath: Path;
  }
): Path | undefined => {
  const list = getAboveNode(editor, {
    at: liPath,
    match: { type: getListTypes(editor) },
  });

  if (!list) return;

  const [listNode, listPath] = list;

  if (!diffListPath || !Path.equals(listPath, diffListPath)) {
    if (listNode.children.length < 2) {
      const liParent = getAboveNode(editor, {
        at: listPath,
        match: { type: editor.getType(ListItemPlugin) },
      });

      if (liParent) {
        return (
          getHighestEmptyList(editor, { diffListPath, liPath: liParent[1] }) ||
          listPath
        );
      }
    }

    return liPath;
  }
};
