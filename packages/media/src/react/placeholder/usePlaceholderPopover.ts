import { isSelectionExpanded } from '@sewell_stephens/late-common';
import {
  useEditorRef,
  useEditorSelector,
  useElement,
} from '@sewell_stephens/late-common/react';
import { useFocused, useReadOnly, useSelected } from 'slate-react';

import type { TPlaceholderElement } from '../../lib/placeholder/types';

import { PlaceholderPlugin } from '../../lib/placeholder/PlaceholderPlugin';
import { usePlaceholderStore } from './placeholderStore';

export const usePlaceholderPopoverState = () => {
  const editor = useEditorRef();
  const readOnly = useReadOnly();
  const selected = useSelected();
  const focused = useFocused();

  const selectionCollapsed = useEditorSelector(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (editor) => !isSelectionExpanded(editor),
    []
  );

  const element = useElement<TPlaceholderElement>(PlaceholderPlugin.key);
  const { id, mediaType } = element;

  const setProgresses = usePlaceholderStore().set.progresses();
  const setIsUploading = usePlaceholderStore().set.isUploading();
  const setUpdatedFiles = usePlaceholderStore().set.updatedFiles();

  return {
    editor,
    element,
    focused,
    id,
    mediaType,
    readOnly,
    selected,
    selectionCollapsed,
    setIsUploading,
    setProgresses,
    setUpdatedFiles,
  };
};
