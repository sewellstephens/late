import {
  type TEditor,
  type TNodeEntry,
  isDefined,
  unsetNodes,
} from '@sewell_stephens/late-common';

import { INDENT_LIST_KEYS } from '../IndentListPlugin';

/**
 * If there is no previous list item and node list start is defined, unset list
 * start (1).
 */
export const normalizeFirstIndentListStart = (
  editor: TEditor,
  [node, path]: TNodeEntry
) => {
  if (isDefined(node[INDENT_LIST_KEYS.listStart])) {
    unsetNodes(editor, INDENT_LIST_KEYS.listStart, { at: path });

    return true;
  }
};
