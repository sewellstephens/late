import type React from 'react';

import type { SlateEditor } from '@sewellstephens/plate-common';

import { select } from '@sewellstephens/plate-common';
import { findEventRange } from '@sewellstephens/plate-common/react';

import { uploadFiles } from './uploadFiles';

export const onDropCloud = (
  editor: SlateEditor,
  e: React.DragEvent
): boolean => {
  const { files } = e.dataTransfer;

  if (files.length === 0) return false;

  /** Without this, the dropped file replaces the page */
  e.preventDefault();
  e.stopPropagation();
  /**
   * When we drop a file, the selection won't move automatically to the drop
   * location. Find the location from the event and upload the files at that
   * location.
   */
  const at = findEventRange(editor, e);

  if (!at) return false;

  select(editor, at);
  uploadFiles(editor, files);

  return true;
};

export const onPasteCloud = (
  editor: SlateEditor,
  e: React.ClipboardEvent
): boolean => {
  const { files } = e.clipboardData;

  if (files.length === 0) return false;

  e.preventDefault();
  e.stopPropagation();
  uploadFiles(editor, files);

  return true;
};
