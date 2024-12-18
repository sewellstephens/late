import type { ElementOf } from '@sewell_stephens/slate';

import {
  type ReplaceNodeChildrenOptions,
  replaceNodeChildren,
} from '@sewell_stephens/slate-utils';

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
