import type { TEditor } from '@sewellstephens/slate';
import type { DOMPoint } from 'slate-react/dist/utils/dom';

import { ReactEditor } from 'slate-react';

/** {@link ReactEditor.toSlatePoint} */
export const toSlatePoint = (
  editor: TEditor,
  domPoint: DOMPoint,
  options: Parameters<typeof ReactEditor.toSlatePoint>[2]
) => {
  try {
    return ReactEditor.toSlatePoint(editor as any, domPoint, options);
  } catch (error) {}
};
