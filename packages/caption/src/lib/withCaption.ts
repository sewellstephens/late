import type { Range } from 'slate';

import {
  type ExtendEditor,
  getAboveNode,
  getNodeString,
  getPluginTypes,
  isCollapsed,
  isHotkey,
} from '@sewellstephens/plate-common';

import { type CaptionConfig, CaptionPlugin } from './CaptionPlugin';

/** TODO: tests https://github.com/udecode/editor-protocol/issues/79 */

/**
 * Selection table:
 *
 * - If anchor is in table, focus in a block before: set focus to start of table
 * - If anchor is in table, focus in a block after: set focus to end of table
 * - If focus is in table, anchor in a block before: set focus to end of table
 * - If focus is in table, anchor in a block after: set focus to the point before
 *   start of table
 */
export const withCaption: ExtendEditor<CaptionConfig> = ({
  editor,
  getOptions,
}) => {
  const { apply } = editor;

  editor.apply = (operation) => {
    const { plugins } = getOptions();

    if (operation.type === 'set_selection') {
      const newSelection = {
        ...editor.selection,
        ...operation.newProperties,
      } as Range | null;

      if (
        editor.currentKeyboardEvent &&
        isHotkey('up', editor.currentKeyboardEvent) &&
        newSelection &&
        isCollapsed(newSelection)
      ) {
        const types = getPluginTypes(editor, plugins!);

        const entry = getAboveNode(editor, {
          at: newSelection,
          match: { type: types },
        });

        if (entry) {
          const [node] = entry;

          if (
            node.caption &&
            getNodeString({ children: node.caption } as any).length > 0
          ) {
            setTimeout(() => {
              editor.setOption(CaptionPlugin, 'focusEndPath', entry[1]);
            }, 0);
          }
        }
      }
    }

    apply(operation);
  };

  return editor;
};
