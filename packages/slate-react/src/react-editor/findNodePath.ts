import type { TEditor, TNode } from '@sewellstephens/slate';
import type { Path } from 'slate';

import { ReactEditor } from 'slate-react';

/** Find the path of Slate node. */
export const findNodePath = (
  editor: TEditor,
  node: TNode
): Path | undefined => {
  try {
    return ReactEditor.findPath(editor as any, node);
  } catch (error) {}
};
