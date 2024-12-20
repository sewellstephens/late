import {
  type SlateEditor,
  getBlockAbove,
  getEditorPlugin,
  insertText,
  isEndPoint,
  moveSelection,
} from '@sewell_stephens/late-common';

import type { TMentionItemBase } from './types';

import { type MentionConfig, MentionPlugin } from './MentionPlugin';

export type MentionOnSelectItem<
  TItem extends TMentionItemBase = TMentionItemBase,
> = (editor: SlateEditor, item: TItem, search?: string) => void;

export const getMentionOnSelectItem =
  <TItem extends TMentionItemBase = TMentionItemBase>({
    key = MentionPlugin.key,
  }: { key?: string } = {}): MentionOnSelectItem<TItem> =>
  (editor, item, search = '') => {
    const { getOptions, tf } = getEditorPlugin<MentionConfig>(editor, {
      key: key as any,
    });
    const { insertSpaceAfterMention } = getOptions();

    tf.insert.mention({ search, value: item.text });

    // move the selection after the element
    moveSelection(editor, { unit: 'offset' });

    const pathAbove = getBlockAbove(editor)?.[1];

    const isBlockEnd =
      editor.selection &&
      pathAbove &&
      isEndPoint(editor, editor.selection.anchor, pathAbove);

    if (isBlockEnd && insertSpaceAfterMention) {
      insertText(editor, ' ');
    }
  };
