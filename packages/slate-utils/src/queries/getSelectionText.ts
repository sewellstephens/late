import { type TEditor, getEditorString } from '@sewellstephens/slate';

/** Get the selected text. Return empty string if no selection. */
export const getSelectionText = (editor: TEditor) =>
  getEditorString(editor, editor.selection);
