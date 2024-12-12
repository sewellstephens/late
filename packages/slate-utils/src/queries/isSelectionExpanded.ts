import { type TEditor, isExpanded } from '@sewellstephens/slate';

/** Is the selection expanded. */
export const isSelectionExpanded = (editor: TEditor) =>
  isExpanded(editor.selection);
