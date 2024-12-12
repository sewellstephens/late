import { useEffect } from 'react';

import { getNode } from '@sewellstephens/plate-common';
import { type PlateEditor, useEditorRef } from '@sewellstephens/plate-common/react';
import { toDOMNode } from '@sewellstephens/plate-common/react';

import type { TPlatePlaywrightAdapter } from './types';

const EDITABLE_TO_EDITOR = new WeakMap<HTMLElement, PlateEditor>();

const platePlaywrightAdapter: TPlatePlaywrightAdapter = {
  EDITABLE_TO_EDITOR,
  getNode,
  toDOMNode,
};

export const usePlaywrightAdapter = () => {
  const editor = useEditorRef();

  useEffect(() => {
    window.platePlaywrightAdapter = platePlaywrightAdapter;

    const editable = toDOMNode(editor, editor)!;
    EDITABLE_TO_EDITOR.set(editable, editor);

    return () => {
      EDITABLE_TO_EDITOR.delete(editable);
    };
  }, [editor]);

  return null;
};
