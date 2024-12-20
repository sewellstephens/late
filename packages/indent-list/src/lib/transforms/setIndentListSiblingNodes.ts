import {
  type ElementEntryOf,
  type ElementOf,
  type TEditor,
  unsetNodes,
  withoutNormalizing,
} from '@sewell_stephens/late-common';
import { IndentPlugin } from '@sewell_stephens/late-indent';

import type { GetSiblingIndentListOptions } from '../queries/getSiblingIndentList';

import { INDENT_LIST_KEYS, IndentListPlugin } from '../IndentListPlugin';
import { getIndentListSiblings } from '../queries/getIndentListSiblings';
import { ListStyleType } from '../types';
import { setIndentListNode, setIndentTodoNode } from './setIndentListNode';

/** Set indent list to entry + siblings. */
export const setIndentListSiblingNodes = <
  N extends ElementOf<E>,
  E extends TEditor = TEditor,
>(
  editor: E,
  entry: ElementEntryOf<E>,
  {
    getSiblingIndentListOptions,
    listStyleType = ListStyleType.Disc,
  }: {
    getSiblingIndentListOptions?: GetSiblingIndentListOptions<N, E>;
    listStyleType?: string;
  }
) => {
  withoutNormalizing(editor, () => {
    const siblings = getIndentListSiblings(
      editor,
      entry,
      getSiblingIndentListOptions
    );

    siblings.forEach(([node, path]) => {
      if (listStyleType === INDENT_LIST_KEYS.todo) {
        unsetNodes(editor as any, IndentListPlugin.key, { at: path });
        setIndentTodoNode(editor, {
          at: path,
          indent: node[IndentPlugin.key] as number,
          listStyleType,
        });
      } else {
        unsetNodes(editor as any, INDENT_LIST_KEYS.checked, { at: path });
        setIndentListNode(editor, {
          at: path,
          indent: node[IndentPlugin.key] as number,
          listStyleType,
        });
      }
    });
  });
};
