import type { SlateEditor, TElementEntry } from '@sewell_stephens/late-common';

import { isListNested } from '../queries/isListNested';
import { moveListItemUp } from './moveListItemUp';

/** If list is not nested and if li is not the first child, move li up. */
export const removeFirstListItem = (
  editor: SlateEditor,
  {
    list,
    listItem,
  }: {
    list: TElementEntry;
    listItem: TElementEntry;
  }
) => {
  const [, listPath] = list;

  if (!isListNested(editor, listPath)) {
    moveListItemUp(editor, { list, listItem });

    return true;
  }

  return false;
};
