import {
  type InsertNodesOptions,
  type TEditor,
  getQueryOptions,
} from '@sewellstephens/slate';

import { insertElements } from './insertElements';

export const insertEmptyElement = <E extends TEditor>(
  editor: E,
  type: string,
  options?: InsertNodesOptions<E>
) => {
  insertElements(
    editor,
    {
      children: [{ text: '' }],
      type,
    },
    getQueryOptions(editor, options)
  );
};
