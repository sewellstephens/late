import { isCollapsed } from '@sewellstephens/plate-common';
import { useEditorSelector } from '@sewellstephens/plate-common/react';
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
