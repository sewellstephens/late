import { useEditorRef, useEditorSelector } from '@sewell_stephens/late-common/react';

import { ListStyleType, toggleIndentList } from '../../index';
import { someIndentTodo } from './someIndentTodo';

export const useIndentTodoToolBarButtonState = ({
  nodeType = ListStyleType.Disc,
}: { nodeType?: string } = {}) => {
  const pressed = useEditorSelector(
    (editor) => someIndentTodo(editor),
    [nodeType]
  );

  return {
    nodeType,
    pressed,
  };
};

export const useIndentTodoToolBarButton = ({
  nodeType,
  pressed,
}: ReturnType<typeof useIndentTodoToolBarButtonState>) => {
  const editor = useEditorRef();

  return {
    props: {
      onClick: () => {
        toggleIndentList(editor, {
          listStyleType: nodeType,
        });
      },
      onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
      },
      pressed,
    },
  };
};
