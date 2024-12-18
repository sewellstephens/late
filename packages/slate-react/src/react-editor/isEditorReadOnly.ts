import type { TEditor } from '@sewell_stephens/slate';

import { ReactEditor } from 'slate-react';

/** Check if the editor is in read-only mode. */
export const isEditorReadOnly = (editor: TEditor) =>
  ReactEditor.isReadOnly(editor as any);
