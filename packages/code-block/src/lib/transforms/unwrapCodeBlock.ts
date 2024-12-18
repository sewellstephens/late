import type { Location } from 'slate';

import {
  ParagraphPlugin,
  type SlateEditor,
  getChildren,
  getNodeEntries,
  setElements,
  unwrapNodes,
  withoutNormalizing,
} from '@sewell_stephens/late-common';

import { CodeBlockPlugin } from '../CodeBlockPlugin';

export const unwrapCodeBlock = (editor: SlateEditor) => {
  if (!editor.selection) return;

  const codeBlockType = editor.getType(CodeBlockPlugin);
  const defaultType = editor.getType(ParagraphPlugin);

  withoutNormalizing(editor, () => {
    const codeBlockEntries = getNodeEntries(editor, {
      at: editor.selection as Location,
      match: { type: codeBlockType },
    });

    const reversedCodeBlockEntries = Array.from(codeBlockEntries).reverse();

    for (const codeBlockEntry of reversedCodeBlockEntries) {
      const codeLineEntries = getChildren(codeBlockEntry);

      for (const [, path] of codeLineEntries) {
        setElements(editor, { type: defaultType }, { at: path });
      }

      unwrapNodes(editor, {
        at: codeBlockEntry[1],
        match: { type: codeBlockType },
        split: true,
      });
    }
  });
};
