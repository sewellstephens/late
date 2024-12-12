import {
  type SetNodesOptions,
  type SlateEditor,
  type TNodeMatch,
  getKeyByType,
  isBlock,
  setElements,
  unsetNodes,
} from '@sewellstephens/plate-common';

import type { Alignment } from '../types';

import { AlignPlugin } from '../AlignPlugin';

export const setAlign = <E extends SlateEditor>(
  editor: E,
  {
    setNodesOptions,
    value,
  }: {
    setNodesOptions?: SetNodesOptions<E>;
    value: Alignment;
  }
) => {
  const {
    inject: { targetPlugins },
  } = editor.getPlugin(AlignPlugin);
  const { defaultNodeValue, nodeKey } = editor.getInjectProps(AlignPlugin);

  const match: TNodeMatch = (n) => {
    return (
      isBlock(editor, n) &&
      !!targetPlugins &&
      targetPlugins.includes(getKeyByType(editor, n.type as string))
    );
  };

  if (value === defaultNodeValue) {
    unsetNodes(editor, nodeKey!, {
      match,
      ...setNodesOptions,
    });
  } else {
    setElements(
      editor,
      { [nodeKey!]: value },
      {
        match: match as any,
        ...setNodesOptions,
      }
    );
  }
};
