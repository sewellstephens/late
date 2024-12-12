import { useEditorRef, useElement } from '@sewellstephens/plate-common/react';
import { useFocused, useReadOnly, useSelected } from 'slate-react';

import type { TPlaceholderElement } from '../../lib/placeholder/types';

import { PlaceholderPlugin } from '../../lib/placeholder/PlaceholderPlugin';
import { usePlaceholderStore } from './placeholderStore';

export const usePlaceholderElementState = () => {
  const element = useElement();
  const editor = useEditorRef();
  const focused = useFocused();
  const readOnly = useReadOnly();
  const selected = useSelected();

  const progresses = usePlaceholderStore().get.progresses();
  const isUploading = usePlaceholderStore().get.isUploading();
  const updatedFiles = usePlaceholderStore().get.updatedFiles();

  const { mediaType } = useElement<TPlaceholderElement>(PlaceholderPlugin.key);

  const progressing = updatedFiles.length > 0 && isUploading;

  return {
    editor,
    element,
    focused,
    isUploading,
    mediaType,
    progresses,
    progressing,
    readOnly,
    selected,
    updatedFiles,
  };
};
