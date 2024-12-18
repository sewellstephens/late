import {
  type GetAboveNodeOptions,
  type SlateEditor,
  getBlockAbove,
} from '@sewell_stephens/late-common';

import { TablePlugin } from '../TablePlugin';

export const getTableAbove = <E extends SlateEditor>(
  editor: E,
  options?: GetAboveNodeOptions<E>
) =>
  getBlockAbove(editor, {
    match: {
      type: editor.getType(TablePlugin),
    },
    ...options,
  });
