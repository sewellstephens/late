import {
  type InsertNodesOptions,
  type SlateEditor,
  getBlockAbove,
  getEditorPlugin,
  getStartPoint,
  insertNodes,
  someNode,
  withoutNormalizing,
} from '@sewell_stephens/late-common';
import { selectEditor } from '@sewell_stephens/late-common/react';

import type { TTableElement } from '../../lib/types';

import { TablePlugin } from '../../lib/TablePlugin';
import {
  type GetEmptyTableNodeOptions,
  getEmptyTableNode,
} from '../../lib/utils/getEmptyTableNode';

/** Insert table if selection not in table. Select start of table. */
export const insertTable = <E extends SlateEditor>(
  editor: E,
  { colCount = 2, header, rowCount = 2 }: GetEmptyTableNodeOptions = {},
  options: InsertNodesOptions<E> = {}
) => {
  const { type } = getEditorPlugin(editor, TablePlugin);

  withoutNormalizing(editor, () => {
    if (
      !someNode(editor, {
        match: { type },
      })
    ) {
      insertNodes<TTableElement>(
        editor,
        getEmptyTableNode(editor, {
          colCount,
          header,
          rowCount,
        }),
        {
          nextBlock: true,
          ...(options as any),
        }
      );

      if (editor.selection) {
        const tableEntry = getBlockAbove(editor, {
          match: { type },
        });

        if (!tableEntry) return;

        selectEditor(editor, { at: getStartPoint(editor, tableEntry[1]) });
      }
    }
  });
};
