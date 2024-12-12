import {
  findNodePath,
  useEditorRef,
  useElement,
} from '@sewellstephens/plate-common/react';

import { CaptionPlugin } from '../../lib';

export const useCaptionButtonState = () => {
  const editor = useEditorRef();
  const element = useElement();

  return { editor, element };
};

export const useCaptionButton = ({
  editor,
  element,
}: ReturnType<typeof useCaptionButtonState>) => {
  return {
    props: {
      onClick: () => {
        const path = findNodePath(editor, element);
        editor.setOption(CaptionPlugin, 'visibleId', element.id as string);
        setTimeout(() => {
          path && editor.setOption(CaptionPlugin, 'focusEndPath', path);
        }, 0);
      },
    },
  };
};
