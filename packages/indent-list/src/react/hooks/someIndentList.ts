import { type SlateEditor, someNode } from '@sewell_stephens/late-common';

import { INDENT_LIST_KEYS, IndentListPlugin, ListStyleType } from '../../index';

export const someIndentList = (editor: SlateEditor, type: string) => {
  return (
    !!editor.selection &&
    someNode(editor, {
      match: (n) => {
        const list = n[IndentListPlugin.key];

        if ((type as any) === ListStyleType.Disc) {
          return list === ListStyleType.Disc;
        }

        const isHasProperty = n.hasOwnProperty(INDENT_LIST_KEYS.checked);

        return !!list && list !== ListStyleType.Disc && !isHasProperty;
      },
    })
  );
};
