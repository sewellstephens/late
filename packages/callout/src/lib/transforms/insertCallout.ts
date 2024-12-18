import {
  type InsertNodesOptions,
  type SlateEditor,
  insertNodes,
} from '@sewell_stephens/late-common';

import { CalloutPlugin, type TCalloutElement } from '../CalloutPlugin';

export const insertCallout = <E extends SlateEditor>(
  editor: E,
  options?: InsertNodesOptions<E>
) => {
  insertNodes<TCalloutElement>(
    editor,
    {
      children: [{ text: '' }],
      type: editor.getType(CalloutPlugin),
      variant: 'info',
    },
    options as any
  );
};
