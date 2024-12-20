import {
  type SlateEditor,
  type TElement,
  type TElementEntry,
  getNode,
  match,
  moveChildren,
} from '@sewell_stephens/late-common';
import { Path } from 'slate';

import { getListTypes } from '../queries/getListTypes';

export const moveListSiblingsAfterCursor = (
  editor: SlateEditor,
  {
    at,
    to,
  }: {
    at: Path;
    to: Path;
  }
): number => {
  const offset = at.at(-1)!;
  at = Path.parent(at);
  const listNode = getNode<TElement>(editor, at)!;
  const listEntry: TElementEntry = [listNode, at];

  if (
    !match(listNode, [], { type: getListTypes(editor) }) ||
    Path.isParent(at, to) // avoid moving nodes within its own list
  ) {
    return 0;
  }

  return moveChildren(editor, {
    at: listEntry as any,
    fromStartIndex: offset + 1,
    to,
  });
};
