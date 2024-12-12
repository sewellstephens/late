import type { TEditor } from '@sewellstephens/slate';

import { ReactEditor } from 'slate-react';

/** {@link ReactEditor.findEventRange} */
export const findEventRange = (editor: TEditor, event: any) => {
  try {
    return ReactEditor.findEventRange(editor as any, event);
  } catch (error) {}
};
