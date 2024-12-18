import {
  type TEditor,
  type TNodeEntry,
  isDefined,
  unsetNodes,
} from '@sewell_stephens/late-common';
import { IndentPlugin } from '@sewell_stephens/late-indent';

import { INDENT_LIST_KEYS, IndentListPlugin } from '../IndentListPlugin';

/** Unset IndentListPlugin.key, listStart if IndentPlugin.key is not defined. */
export const normalizeIndentListNotIndented = (
  editor: TEditor,
  [node, path]: TNodeEntry
) => {
  if (
    !isDefined(node[IndentPlugin.key]) &&
    (node[IndentListPlugin.key] || node[INDENT_LIST_KEYS.listStart])
  ) {
    unsetNodes(editor, [IndentListPlugin.key, INDENT_LIST_KEYS.listStart], {
      at: path,
    });

    return true;
  }
};
