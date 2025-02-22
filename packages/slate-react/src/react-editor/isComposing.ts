import type { TEditor } from '@sewell_stephens/slate';

import { ReactEditor } from 'slate-react';

/** Check if the user is currently composing inside the editor. */
export const isComposing = (editor: TEditor) =>
  ReactEditor.isComposing(editor as any);
