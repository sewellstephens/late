import {
  type InsertNodesOptions,
  ParagraphPlugin,
  type SlateEditor,
  getQueryOptions,
  insertNodes,
} from '@sewell_stephens/late-common';

import type { TColumnElement } from '../types';

import { ColumnItemPlugin } from '../ColumnPlugin';

export const insertEmptyColumn = <E extends SlateEditor>(
  editor: E,
  options?: { width?: string } & InsertNodesOptions<E>
) => {
  const width = options?.width || '33%';

  insertNodes<TColumnElement>(
    editor,
    {
      children: [{ children: [{ text: '' }], type: ParagraphPlugin.key }],
      type: ColumnItemPlugin.key,
      width,
    },
    getQueryOptions(editor, options)
  );
};
