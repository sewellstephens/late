import type { SlateEditor } from '@sewell_stephens/late-common';

import { toDOMNode } from '@sewell_stephens/late-common/react';
import clamp from 'lodash/clamp.js';

import type { TCommentText } from '../../lib/types';

import { getElementAbsolutePosition } from '../../lib';

export const getCommentPosition = (editor: SlateEditor, node: TCommentText) => {
  const DOMNode = toDOMNode(editor, node);

  if (!DOMNode) return;

  const DOMNodePosition = getElementAbsolutePosition(DOMNode);

  const editorDOMNode = toDOMNode(editor, editor);

  if (!editorDOMNode) return;

  const { width: editorWidth, x: editorX } =
    editorDOMNode.getBoundingClientRect();

  const sidebarWidth = 418;
  const padding = 16;

  return {
    left: clamp(
      editorX + editorWidth + 16,
      window.innerWidth - (sidebarWidth + padding)
    ),
    top: DOMNodePosition.top,
  };
};
