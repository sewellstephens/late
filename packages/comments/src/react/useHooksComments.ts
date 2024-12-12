import { isExpanded } from '@sewellstephens/plate-common';
import { type UseHooks, useHotkeys } from '@sewellstephens/plate-common/react';

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
