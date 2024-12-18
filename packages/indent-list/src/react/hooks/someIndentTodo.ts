import { type SlateEditor, someNode } from '@sewell_stephens/late-common';

import { INDENT_LIST_KEYS, IndentListPlugin } from '../../index';

export const someIndentTodo = (editor: SlateEditor) => {
  return someNode(editor, {
    at: editor.selection!,
    match: (n) => {
      const list = n[IndentListPlugin.key];
      const isHasProperty = n.hasOwnProperty(INDENT_LIST_KEYS.checked);

      return n.type === 'p' && isHasProperty && list === INDENT_LIST_KEYS.todo;
    },
  });
};
