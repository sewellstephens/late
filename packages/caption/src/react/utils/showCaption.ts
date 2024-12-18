import type { SlateEditor, TElement } from '@sewell_stephens/late-common';

import { findNodePath } from '@sewell_stephens/late-common/react';

import { CaptionPlugin } from '../CaptionPlugin';

export const showCaption = (editor: SlateEditor, element: TElement) => {
  const path = findNodePath(editor, element);
  editor.setOption(CaptionPlugin, 'visibleId', element.id as string);

  setTimeout(() => {
    path && editor.setOption(CaptionPlugin, 'focusEndPath', path);
  }, 0);
};
