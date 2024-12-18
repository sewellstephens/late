import { useEffect } from 'react';

import { getNode } from '@sewell_stephens/late-common';
import { type LateEditor, useEditorRef } from '@sewell_stephens/late-common/react';
import { toDOMNode } from '@sewell_stephens/late-common/react';

import type { TLatePlaywrightAdapter } from './types';

const EDITABLE_TO_EDITOR = new WeakMap<HTMLElement, LateEditor>();

const platePlaywrightAdapter: TLatePlaywrightAdapter = {
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
