import type { SlateEditor, TElement } from '@sewellstephens/plate-common';

import { focusEditor } from '@sewellstephens/plate-common/react';

import {
  type BorderDirection,
  isTableBorderHidden,
  setBorderSize,
} from '../../../lib';

export const getOnSelectTableBorderFactory =
  (editor: SlateEditor, selectedCells: TElement[] | null) =>
  (border: 'none' | 'outer' | BorderDirection) =>
  () => {
    if (selectedCells) return;
    if (border === 'none') {
      setBorderSize(editor, 0, { border: 'all' });
    } else if (border === 'outer') {
      setBorderSize(editor, 1, { border: 'all' });
    } else {
      const size = isTableBorderHidden(editor, border) ? 1 : 0;

      setBorderSize(editor, size, { border });
    }

    setTimeout(() => {
      focusEditor(editor);
    }, 50);
  };
