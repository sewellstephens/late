import type { ExtendEditor } from '@sewellstephens/plate-common/react';

import { collapseSelection, isExpanded } from '@sewellstephens/plate-common';

import { type TableConfig, getTableAbove } from '../lib';
import { getTableGridAbove } from './queries';

export const withInsertTextTable: ExtendEditor<TableConfig> = ({ editor }) => {
  const { insertText } = editor;

  editor.insertText = (text) => {
    if (isExpanded(editor.selection)) {
      const entry = getTableAbove(editor, {
        at: editor.selection?.anchor,
      });

      if (entry) {
        const cellEntries = getTableGridAbove(editor, {
          format: 'cell',
        });

        if (cellEntries.length > 1) {
          collapseSelection(editor, {
            edge: 'focus',
          });
        }
      }
    }

    insertText(text);
  };

  return editor;
};
