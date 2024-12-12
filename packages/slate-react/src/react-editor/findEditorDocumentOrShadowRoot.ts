import type { TEditor } from '@sewellstephens/slate';

import { ReactEditor } from 'slate-react';

/** Find the DOM node that implements DocumentOrShadowRoot for the editor. */
export const findEditorDocumentOrShadowRoot = (editor: TEditor) => {
  try {
    return ReactEditor.findDocumentOrShadowRoot(editor as any);
  } catch (error) {}
};
