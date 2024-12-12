import {
  type GetAboveNodeOptions,
  type TEditor,
  findNode,
  setNodes,
} from '@sewellstephens/plate-common';

import type { TTableElement } from '../types';

import { TablePlugin } from '../TablePlugin';

export const setTableMarginLeft = <E extends TEditor>(
  editor: E,
  { marginLeft }: { marginLeft: number },
  options: GetAboveNodeOptions<E> = {}
) => {
  const table = findNode<TTableElement>(editor, {
    match: { type: TablePlugin.key },
    ...options,
  });

  if (!table) return;

  const [, tablePath] = table;

  setNodes<TTableElement>(editor, { marginLeft }, { at: tablePath });
};
