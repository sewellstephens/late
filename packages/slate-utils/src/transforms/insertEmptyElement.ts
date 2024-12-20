import {
  type InsertNodesOptions,
  type TEditor,
  getQueryOptions,
} from '@sewell_stephens/slate';

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
