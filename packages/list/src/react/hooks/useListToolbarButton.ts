import { someNode } from '@sewellstephens/plate-common';
import { useEditorRef, useEditorSelector } from '@sewellstephens/plate-common/react';

import { BulletedListPlugin } from '../../lib/index';
import { ListPlugin } from '../ListPlugin';

export const useListToolbarButtonState = ({
  nodeType = BulletedListPlugin.key as string,
} = {}) => {
  const pressed = useEditorSelector(
    (editor) =>
      !!editor.selection &&
      someNode(editor, { match: { type: editor.getType({ key: nodeType }) } }),
    [nodeType]
  );

  return {
    nodeType,
    pressed,
  };
};

export const useListToolbarButton = (
  state: ReturnType<typeof useListToolbarButtonState>
) => {
  const editor = useEditorRef();
  const tf = editor.getTransforms(ListPlugin);

  return {
    props: {
      onClick: () => {
        tf.toggle.list({ type: state.nodeType });
      },
      onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
      },
      pressed: state.pressed,
    },
  };
};
