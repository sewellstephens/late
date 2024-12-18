import type { TEditor, TNode } from '@sewell_stephens/slate';

import { ReactEditor } from 'slate-react';

/** Find the native DOM element from a Slate node. */
export const toDOMNode = (editor: TEditor, node: TNode) => {
  try {
    return ReactEditor.toDOMNode(editor as any, node);
  } catch (error) {}
};
