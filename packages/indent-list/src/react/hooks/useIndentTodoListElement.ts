import { type TElement, setNodes } from '@sewellstephens/plate-common';
import { findNodePath, useEditorRef } from '@sewellstephens/plate-common/react';
import { useReadOnly } from 'slate-react';

export const useIndentTodoListElementState = ({
  element,
}: {
  element: TElement;
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

export const useIndentTodoListElement = (
  state: ReturnType<typeof useIndentTodoListElementState>
) => {
  const { checked, editor, element, readOnly } = state;

  return {
    checkboxProps: {
      checked: !!checked,
      onCheckedChange: (value: boolean) => {
        if (readOnly) return;

        const path = findNodePath(editor, element);

        if (!path) return;

        setNodes(editor, { checked: value }, { at: path });
      },
      onMouseDown: (e: any) => {
        e.preventDefault();
      },
    },
  };
};
