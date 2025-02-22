import type { TEditor } from '@sewell_stephens/slate';

import { ReactEditor } from 'slate-react';

/** Find the DOM node that implements DocumentOrShadowRoot for the editor. */
export const findEditorDocumentOrShadowRoot = (editor: TEditor) => {
  try {
    return ReactEditor.findDocumentOrShadowRoot(editor as any);
  } catch (error) {}
};
