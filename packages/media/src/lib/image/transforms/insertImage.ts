import {
  type InsertNodesOptions,
  type SlateEditor,
  insertNodes,
} from '@sewell_stephens/late-common';

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
