import type { TEditor } from '@sewellstephens/slate';

import { ReactEditor } from 'slate-react';

/** Deselect the editor. */
export const deselectEditor = (editor: TEditor) =>
  ReactEditor.deselect(editor as any);
