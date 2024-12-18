import { isCollapsed } from '@sewell_stephens/late-common';
import { useEditorSelector } from '@sewell_stephens/late-common/react';
import { useReadOnly, useSelected } from 'slate-react';

export const useDebouncePopoverOpen = () => {
  const readOnly = useReadOnly();
  const selected = useSelected();

  const selectionCollapsed = useEditorSelector(
    (editor) => isCollapsed(editor.selection),
    []
  );

  // TODO:should add debounce
  return !readOnly && selected && selectionCollapsed;
};
