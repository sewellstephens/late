import type { SlateEditor } from '@sewellstephens/plate-common';

import { moveListItems } from './moveListItems';

export const indentListItems = (editor: SlateEditor) => {
  moveListItems(editor, { increase: true });
};
