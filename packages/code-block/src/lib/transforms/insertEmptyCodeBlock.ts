import {
  ParagraphPlugin,
  type SlateEditor,
  insertElements,
  isBlockAboveEmpty,
  isExpanded,
} from '@sewell_stephens/late-common';

import type { CodeBlockInsertOptions } from '../types';

import { insertCodeBlock } from './insertCodeBlock';

/**
 * Called by toolbars to make sure a code-block gets inserted below a paragraph
 * rather than awkwardly splitting the current selection.
 */
export const insertEmptyCodeBlock = <E extends SlateEditor>(
  editor: E,
  {
    defaultType = editor.getType(ParagraphPlugin),
    insertNodesOptions,
  }: CodeBlockInsertOptions<E> = {}
) => {
  if (!editor.selection) return;
  if (isExpanded(editor.selection) || !isBlockAboveEmpty(editor)) {
    insertElements(
      editor,
      editor.api.create.block({ children: [{ text: '' }], type: defaultType }),
      {
        nextBlock: true,
        select: true,
        ...insertNodesOptions,
      }
    );
  }

  insertCodeBlock(editor, insertNodesOptions);
};
