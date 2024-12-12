import type { TEditor } from '@sewellstephens/slate';

import { ReactEditor } from 'slate-react';

/** Insert data from a `DataTransfer` into the editor. */
export const insertData = (editor: TEditor, data: DataTransfer) =>
  ReactEditor.insertData(editor as any, data);
