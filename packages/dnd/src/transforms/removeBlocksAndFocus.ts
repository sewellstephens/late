import {
  type GetNodeEntriesOptions,
  type TEditor,
  getNodesRange,
  removeNodes,
  unhangRange,
} from '@sewell_stephens/late-common';
import { focusEditor } from '@sewell_stephens/late-common/react';

import { getBlocksWithId } from '../queries/getBlocksWithId';

/** Remove blocks with an id and focus the editor. */
export const removeBlocksAndFocus = <E extends TEditor = TEditor>(
  editor: E,
  options: GetNodeEntriesOptions<E>
) => {
  unhangRange(editor, options?.at, options);

  const nodeEntries = getBlocksWithId(editor, options);

  removeNodes(editor, { at: getNodesRange(editor, nodeEntries) });
  focusEditor(editor);
};
