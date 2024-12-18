import { someNode } from '@sewell_stephens/late-common';
import { useEditorRef, useEditorSelector } from '@sewell_stephens/late-common/react';

import { LinkPlugin, triggerFloatingLink } from '../index';

export const useLinkToolbarButtonState = () => {
  const pressed = useEditorSelector(
    (editor) =>
      !!editor?.selection &&
      someNode(editor, {
        match: { type: editor.getType(LinkPlugin) },
      }),
    []
  );

  return {
    pressed,
  };
};

export const useLinkToolbarButton = (
  state: ReturnType<typeof useLinkToolbarButtonState>
) => {
  const editor = useEditorRef();

  return {
    props: {
      onClick: () => {
        triggerFloatingLink(editor, { focused: true });
      },
      onMouseDown: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
      },
      pressed: state.pressed,
    },
  };
};
