import type { TEditor } from '@sewell_stephens/slate';

import { ReactEditor } from 'slate-react';

/** Deselect the editor. */
export const deselectEditor = (editor: TEditor) =>
  ReactEditor.deselect(editor as any);
