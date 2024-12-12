import type { TEditor, TNode } from '@sewellstephens/slate';
import type { DOMNode } from 'slate-react/dist/utils/dom';

import { ReactEditor } from 'slate-react';

/** {@link ReactEditor.toSlateNode} */
export const toSlateNode = (editor: TEditor, domNode: DOMNode) => {
  try {
    return ReactEditor.toSlateNode(editor as any, domNode) as TNode;
  } catch (error) {}
};
