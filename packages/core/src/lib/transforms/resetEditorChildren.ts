import type { ElementOf } from '@sewellstephens/slate';

import {
  type ReplaceNodeChildrenOptions,
  replaceNodeChildren,
} from '@sewellstephens/slate-utils';

import type { SlateEditor } from '../editor';

/** Replace editor children by default block. */
export const resetEditorChildren = <E extends SlateEditor = SlateEditor>(
  editor: E,
  options?: Omit<ReplaceNodeChildrenOptions<ElementOf<E>, E>, 'at' | 'nodes'>
) => {
  replaceNodeChildren<ElementOf<E>>(editor, {
    at: [],
    nodes: editor.api.create.value(),
    ...options,
  } as any);
};
