import type { TEditor } from '@sewellstephens/slate';

import { ReactEditor } from 'slate-react';

/** Check if the target can be selectable. */
export const hasEditorSelectableTarget = (
  editor: TEditor,
  target: EventTarget | null
) => {
  try {
    return ReactEditor.hasSelectableTarget(editor as any, target);
  } catch (error) {}

  return false;
};
