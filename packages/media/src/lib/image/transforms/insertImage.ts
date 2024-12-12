import {
  type InsertNodesOptions,
  type SlateEditor,
  insertNodes,
} from '@sewellstephens/plate-common';

import { ImagePlugin, type TImageElement } from '../ImagePlugin';

export const insertImage = <E extends SlateEditor>(
  editor: E,
  url: ArrayBuffer | string,
  options: InsertNodesOptions<E> = {}
) => {
  const text = { text: '' };
  const image: TImageElement = {
    children: [text],
    type: editor.getType(ImagePlugin),
    url: url as any,
  };
  insertNodes<TImageElement>(editor, image, {
    nextBlock: true,
    ...(options as any),
  });
};
