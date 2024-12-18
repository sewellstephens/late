import type { LateEditor } from '@sewell_stephens/late-common/react';

import { DRAG_ITEM_BLOCK } from './useDragBlock';
import { type UseDropNodeOptions, useDropNode } from './useDropNode';

/** {@link useDropNode} */
export const useDropBlock = (
  editor: LateEditor,
  options: Omit<UseDropNodeOptions, 'accept'>
) => useDropNode(editor, { accept: DRAG_ITEM_BLOCK, ...options });
