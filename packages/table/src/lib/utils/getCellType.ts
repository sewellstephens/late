import { type SlateEditor, getPluginTypes } from '@sewellstephens/plate-common';

import { TableCellHeaderPlugin, TableCellPlugin } from '../TablePlugin';

/** Get td and th types */
export const getCellTypes = (editor: SlateEditor) =>
  getPluginTypes(editor, [TableCellPlugin, TableCellHeaderPlugin]);
