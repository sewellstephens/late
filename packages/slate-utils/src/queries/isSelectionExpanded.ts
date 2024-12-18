import { type TEditor, isExpanded } from '@sewell_stephens/slate';

/** Is the selection expanded. */
export const isSelectionExpanded = (editor: TEditor) =>
  isExpanded(editor.selection);
