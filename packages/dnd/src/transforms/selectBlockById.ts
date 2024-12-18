import {
  type TEditor,
  findNode,
  getRange,
  select,
} from '@sewell_stephens/late-common';
import { focusEditor } from '@sewell_stephens/late-common/react';

/** Select the block above the selection by id and focus the editor. */
export const selectBlockById = (editor: TEditor, id: string) => {
  const path = findNode(editor, { at: [], match: { id } })?.[1];

  if (!path) return;

  select(editor, getRange(editor, path));
  focusEditor(editor);
};
