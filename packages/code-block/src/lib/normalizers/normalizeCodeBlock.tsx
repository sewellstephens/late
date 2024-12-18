import {
  type SlateEditor,
  type TElement,
  type TNodeEntry,
  getChildren,
  isElement,
  setNodes,
} from '@sewell_stephens/late-common';

import { CodeBlockPlugin, CodeLinePlugin } from '../CodeBlockPlugin';

/** Normalize code block node to force the pre>code>div.codeline structure. */
export const normalizeCodeBlock = (editor: SlateEditor) => {
  const codeBlockType = editor.getType(CodeBlockPlugin);
  const codeLineType = editor.getType(CodeLinePlugin);

  const { normalizeNode } = editor;

  return ([node, path]: TNodeEntry) => {
    normalizeNode([node, path]);

    if (!isElement(node)) {
      return;
    }

    const isCodeBlockRoot = node.type === codeBlockType;

    if (isCodeBlockRoot) {
      // Children should all be code lines
      const nonCodeLine = getChildren([node, path]).find(
        ([child]) => child.type !== codeLineType
      );

      if (nonCodeLine) {
        setNodes<TElement>(
          editor,
          { type: codeLineType },
          { at: nonCodeLine[1] }
        );
      }
    }
  };
};
