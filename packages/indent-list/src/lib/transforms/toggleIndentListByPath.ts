import {
  ParagraphPlugin,
  type SlateEditor,
  type TNodeEntry,
  setNodes,
  unsetNodes,
} from '@sewell_stephens/late-common';
import { IndentPlugin } from '@sewell_stephens/late-indent';

import { INDENT_LIST_KEYS, IndentListPlugin } from '../IndentListPlugin';

export const toggleIndentListByPath = (
  editor: SlateEditor,
  [node, path]: TNodeEntry,
  listStyleType: string
) => {
  setNodes(
    editor,
    {
      // TODO: normalized if not todo remove this property.
      [INDENT_LIST_KEYS.checked]: false,
      [IndentListPlugin.key]: listStyleType,
      [IndentPlugin.key]: node.indent ?? 1,
      type: ParagraphPlugin.key,
    },
    {
      at: path,
    }
  );
};

export const toggleIndentListByPathUnSet = (
  editor: SlateEditor,
  [, path]: TNodeEntry
) =>
  unsetNodes(
    editor,
    [IndentListPlugin.key, IndentPlugin.key, INDENT_LIST_KEYS.checked],
    {
      at: path,
    }
  );
