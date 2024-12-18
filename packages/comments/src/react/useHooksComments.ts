import { isExpanded } from '@sewell_stephens/late-common';
import { type UseHooks, useHotkeys } from '@sewell_stephens/late-common/react';

import type { CommentsConfig } from './CommentsPlugin';

export const useHooksComments: UseHooks<CommentsConfig> = ({
  editor,
  setOption,
  tf,
}) => {
  useHotkeys(
    editor.shortcuts.toggleComment!.keys!,
    (e) => {
      if (!editor.selection) return;

      e.preventDefault();

      // block comments

      if (!isExpanded(editor.selection)) return;

      tf.insert.comment();
      setOption('focusTextarea', true);
    },
    {
      enableOnContentEditable: true,
    }
  );
};
