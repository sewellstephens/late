import {
  type SlateEditor,
  type TElement,
  type TNodeEntry,
  replaceNode,
} from '@sewellstephens/plate-common';

import { ColumnItemPlugin, ColumnPlugin } from '../ColumnPlugin';

export const toggleColumns = (editor: SlateEditor, nodeEntry: TNodeEntry) => {
  const nodes = {
    children: [
      {
        children: [nodeEntry[0]],
        type: ColumnItemPlugin.key,
        width: '33.33%',
      },
      {
        children: [{ text: '' }],
        type: ColumnItemPlugin.key,
        width: '33.33%',
      },
      {
        children: [{ text: '' }],
        type: ColumnItemPlugin.key,
        width: '33.33%',
      },
    ],
    type: ColumnPlugin.key,
  } as TElement;

  replaceNode(editor, {
    at: nodeEntry[1],
    nodes,
  });
};
