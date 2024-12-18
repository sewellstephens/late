import {
  type SlateEditor,
  type TElement,
  getBlockAbove,
  getNodeEntries,
  isCollapsed,
  isExpanded,
  setElements,
  unsetNodes,
  withoutNormalizing,
} from '@sewell_stephens/late-common';
import { IndentPlugin } from '@sewell_stephens/late-indent';

import type { IndentListOptions } from './indentList';

import { INDENT_LIST_KEYS, IndentListPlugin } from '../IndentListPlugin';
import { areEqListStyleType } from '../queries/areEqListStyleType';
import { setIndentListNodes } from './setIndentListNodes';
import { setIndentListSiblingNodes } from './setIndentListSiblingNodes';
import { toggleIndentListSet } from './toggleIndentListSet';
import { toggleIndentListUnset } from './toggleIndentListUnset';

/** Toggle indent list. */
export const toggleIndentList = <E extends SlateEditor>(
  editor: E,
  options: IndentListOptions<E>
) => {
  const { listStyleType } = options;

  const { getSiblingIndentListOptions } = editor.getOptions(IndentListPlugin);

  if (isCollapsed(editor.selection)) {
    const entry = getBlockAbove<TElement>(editor);

    if (!entry) return;
    if (toggleIndentListSet(editor, entry, { listStyleType })) {
      return;
    }
    if (toggleIndentListUnset(editor, entry, { listStyleType })) {
      return;
    }

    setIndentListSiblingNodes(editor, entry, {
      getSiblingIndentListOptions,
      listStyleType,
    });

    return;
  }
  if (isExpanded(editor.selection)) {
    const _entries = getNodeEntries<TElement>(editor, { block: true });
    const entries = [..._entries];

    const eqListStyleType = areEqListStyleType(editor, entries, {
      listStyleType,
    });

    if (eqListStyleType) {
      withoutNormalizing(editor, () => {
        entries.forEach((entry) => {
          const [node, path] = entry;

          const indent = node[IndentPlugin.key] as number;

          unsetNodes(editor, IndentListPlugin.key, { at: path });

          if (indent > 1) {
            setElements(
              editor,
              { [IndentPlugin.key]: indent - 1 },
              { at: path }
            );
          } else {
            unsetNodes(editor, [IndentPlugin.key, INDENT_LIST_KEYS.checked], {
              at: path,
            });
          }
          // setIndentListNode(editor, {
          //   listStyleType,
          //   indent: node[IndentPlugin.key],
          //   at: path,
          // });
        });
      });

      return;
    }

    setIndentListNodes(editor, entries, { listStyleType });
  }
};
