import {
  type InsertNodesOptions,
  type SlateEditor,
  type TElement,
  insertNodes,
} from '@sewellstephens/plate-common';

import { TocPlugin } from '../TocPlugin';

export const insertToc = <E extends SlateEditor>(
  editor: E,
  options?: InsertNodesOptions<E>
) => {
  insertNodes<TElement>(
    editor,
    {
      children: [{ text: '' }],
      type: editor.getType(TocPlugin),
    },
    options as any
  );
};
