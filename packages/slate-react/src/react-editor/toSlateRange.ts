import type { TEditor } from '@sewell_stephens/slate';

import { ReactEditor } from 'slate-react';

/** {@link ReactEditor.toSlateRange} */
export const toSlateRange = (
  editor: TEditor,
  domRange: Parameters<typeof ReactEditor.toSlateRange>[1],
  options: Parameters<typeof ReactEditor.toSlateRange>[2]
) => {
  try {
    return ReactEditor.toSlateRange(editor as any, domRange, options);
  } catch (error) {}
};
