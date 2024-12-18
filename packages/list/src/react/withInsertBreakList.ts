import type { ResetNodeConfig } from '@sewell_stephens/late-reset-node';

import {
  ParagraphPlugin,
  createTSlatePlugin,
  isBlockAboveEmpty,
} from '@sewell_stephens/late-common';
import {
  type ExtendEditor,
  getEditorPlugin,
} from '@sewell_stephens/late-common/react';
import {
  SIMULATE_BACKSPACE,
  onKeyDownResetNode,
} from '@sewell_stephens/late-reset-node/react';

import { type ListConfig, ListItemPlugin } from '../lib/ListPlugin';
import { getListItemEntry } from '../lib/queries/getListItemEntry';
import { insertListItem } from '../lib/transforms/insertListItem';
import { moveListItemUp } from '../lib/transforms/moveListItemUp';
import { unwrapList } from '../lib/transforms/unwrapList';

export const withInsertBreakList: ExtendEditor<ListConfig> = ({ editor }) => {
  const { insertBreak } = editor;

  editor.insertBreak = () => {
    const insertBreakList = () => {
      if (!editor.selection) return;

      const res = getListItemEntry(editor, {});
      let moved: boolean | undefined;

      // If selection is in a li
      if (res) {
        const { list, listItem } = res;

        // If selected li is empty, move it up.
        if (isBlockAboveEmpty(editor)) {
          moved = moveListItemUp(editor, {
            list,
            listItem,
          });

          if (moved) return true;
        }
      }

      const didReset = onKeyDownResetNode({
        ...getEditorPlugin(
          editor,
          createTSlatePlugin<ResetNodeConfig>({
            options: {
              rules: [
                {
                  defaultType: editor.getType(ParagraphPlugin),
                  onReset: (_editor) => unwrapList(_editor),
                  predicate: () => !moved && isBlockAboveEmpty(editor),
                  types: [editor.getType(ListItemPlugin)],
                },
              ],
            },
          })
        ),
        event: SIMULATE_BACKSPACE,
      });

      if (didReset) return true;
      /** If selection is in li > p, insert li. */
      if (!moved) {
        const inserted = insertListItem(editor);

        if (inserted) return true;
      }
    };

    // TODO react
    if (insertBreakList()) return;

    insertBreak();
  };

  return editor;
};
