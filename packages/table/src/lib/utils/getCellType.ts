import { type SlateEditor, getPluginTypes } from '@sewell_stephens/late-common';

import { TableCellHeaderPlugin, TableCellPlugin } from '../TablePlugin';

/** Get td and th types */
export const getCellTypes = (editor: SlateEditor) =>
  getPluginTypes(editor, [TableCellPlugin, TableCellHeaderPlugin]);
