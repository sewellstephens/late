import { Key, toTLatePlugin } from '@sewell_stephens/late-common/react';

import { TodoListPlugin as BaseTodoListPlugin } from '../lib/TodoListPlugin';

/** Enables support for todo lists with React-specific features. */
export const TodoListPlugin = toTLatePlugin(
  BaseTodoListPlugin,
  ({ editor, type }) => ({
    shortcuts: {
      toggleTodoList: {
        handler: () => {
          editor.tf.toggle.block({ type });
        },
        keys: [
          [Key.Mod, Key.Alt, '4'],
          [Key.Mod, Key.Shift, '4'],
        ],
        preventDefault: true,
      },
    },
  })
);
