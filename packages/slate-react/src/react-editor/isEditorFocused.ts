import type { TEditor } from '@sewell_stephens/slate';

import { ReactEditor } from 'slate-react';

/** Check if the editor is focused. */
export const isEditorFocused = (editor: TEditor) =>
  ReactEditor.isFocused(editor as any);
