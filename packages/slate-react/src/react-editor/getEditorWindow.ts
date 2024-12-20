import type { TEditor } from '@sewell_stephens/slate';

import { ReactEditor } from 'slate-react';

/** Return the host window of the current editor. */
export const getEditorWindow = (editor: TEditor) => {
  try {
    return ReactEditor.getWindow(editor as any);
  } catch (error) {}
};
