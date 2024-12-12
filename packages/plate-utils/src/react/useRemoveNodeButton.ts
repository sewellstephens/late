import { useEditorRef } from '@sewellstephens/plate-core/react';
import { type TElement, removeNodes } from '@sewellstephens/slate';
import { findNodePath } from '@sewellstephens/slate-react';

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
