import { type TElement, setNodes } from '@sewell_stephens/late-common';
import { findNodePath, useEditorRef } from '@sewell_stephens/late-common/react';
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
