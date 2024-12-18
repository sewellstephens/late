import type { TEditor } from '@sewell_stephens/late-common';

import { findNode, getStartPoint, select } from '@sewell_stephens/late-common';
import { focusEditor } from '@sewell_stephens/late-common/react';

/** Select the start of a block by id and focus the editor. */
export const focusBlockStartById = (editor: TEditor, id: string) => {
  const path = findNode(editor, { at: [], match: { id } })?.[1];

  if (!path) return;

  select(editor, getStartPoint(editor, path));
  focusEditor(editor);
};
