import { useEditorRef } from '@sewellstephens/plate-common/react';

import { indent } from '../../index';

export const useIndentButton = () => {
  const editor = useEditorRef();

  return {
    props: {
      onClick: () => {
        indent(editor);
      },
      onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
      },
    },
  };
};
