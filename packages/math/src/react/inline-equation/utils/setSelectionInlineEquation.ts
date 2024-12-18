import type { Path, Range } from 'slate';

import {
  type SlateEditor,
  getNextNodeStartPoint,
  getPreviousNodeEndPoint,
  setSelection,
} from '@sewell_stephens/late-common';
import { focusEditor } from '@sewell_stephens/late-common/react';

export const setSelectionInlineEquation = (
  editor: SlateEditor,
  at: Path,
  direction: 'left' | 'right'
) => {
  const point =
    direction === 'left'
      ? getPreviousNodeEndPoint(editor, at)
      : getNextNodeStartPoint(editor, at);

  if (!point) return;

  const range: Range = {
    anchor: point,
    focus: point,
  };

  setSelection(editor, range);
  focusEditor(editor);
};
