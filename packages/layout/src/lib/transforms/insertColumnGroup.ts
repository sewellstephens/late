import {
  ParagraphPlugin,
  type SlateEditor,
  insertNodes,
  withoutNormalizing,
} from '@sewell_stephens/late-common';

import type { TColumnGroupElement } from '../types';

import { ColumnItemPlugin, ColumnPlugin } from '../ColumnPlugin';

export const insertColumnGroup = (editor: SlateEditor) => {
  withoutNormalizing(editor, () => {
    insertNodes<TColumnGroupElement>(editor, {
      children: [
        {
          children: [{ children: [{ text: '' }], type: ParagraphPlugin.key }],
          type: ColumnItemPlugin.key,
          width: '50%',
        },
        {
          children: [{ children: [{ text: '' }], type: ParagraphPlugin.key }],
          type: ColumnItemPlugin.key,
          width: '50%',
        },
      ],
      layout: [50, 50],
      type: ColumnPlugin.key,
    });
  });
};
