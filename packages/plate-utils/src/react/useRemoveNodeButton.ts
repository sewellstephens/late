import { useEditorRef } from '@sewell_stephens/late-core/react';
import { type TElement, removeNodes } from '@sewell_stephens/slate';
import { findNodePath } from '@sewell_stephens/slate-react';

export const useRemoveNodeButton = ({ element }: { element: TElement }) => {
  const editor = useEditorRef();

  return {
    props: {
      onClick: () => {
        const path = findNodePath(editor, element);

        removeNodes(editor, { at: path });
      },
      onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
      },
    },
  };
};
