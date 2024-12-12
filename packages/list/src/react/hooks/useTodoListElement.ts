import { setNodes } from '@sewellstephens/plate-common';
import { findNodePath, useEditorRef } from '@sewellstephens/plate-common/react';
import { useReadOnly } from 'slate-react';

import type { TTodoListItemElement } from '../../lib';

export const useTodoListElementState = ({
  element,
}: {
  element: TTodoListItemElement;
}) => {
  const editor = useEditorRef();
  const { checked } = element;
  const readOnly = useReadOnly();

  return {
    checked,
    editor,
    element,
    readOnly,
  };
};

export const useTodoListElement = (
  state: ReturnType<typeof useTodoListElementState>
) => {
  const { checked, element, readOnly } = state;
  const editor = useEditorRef();

  return {
    checkboxProps: {
      checked: !!checked,
      onCheckedChange: (value: boolean) => {
        if (readOnly) return;

        const path = findNodePath(editor, element);

        if (!path) return;

        setNodes<TTodoListItemElement>(
          editor,
          { checked: value },
          {
            at: path,
          }
        );
      },
    },
  };
};
