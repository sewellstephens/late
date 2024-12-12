import {
  type PluginConfig,
  type TElement,
  createTSlatePlugin,
} from '@sewellstephens/plate-common';

import { withTodoList } from './withTodoList';

export interface TTodoListItemElement extends TElement {
  checked?: boolean;
}

export type TodoListConfig = PluginConfig<
  'action_item',
  {
    inheritCheckStateOnLineEndBreak?: boolean;
    inheritCheckStateOnLineStartBreak?: boolean;
  }
>;

export const TodoListPlugin = createTSlatePlugin<TodoListConfig>({
  extendEditor: withTodoList,
  key: 'action_item',
  node: { isElement: true },
});
