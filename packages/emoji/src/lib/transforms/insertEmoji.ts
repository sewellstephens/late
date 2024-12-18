import type { Emoji } from '@emoji-mart/data';

import { type SlateEditor, insertNodes } from '@sewell_stephens/late-common';

import { EmojiPlugin } from '../EmojiPlugin';

export const insertEmoji = <TEmoji extends Emoji = Emoji>(
  editor: SlateEditor,
  emoji: TEmoji
) => {
  const { createEmojiNode } = editor.getOptions(EmojiPlugin);

  const emojiNode = createEmojiNode!(emoji);
  insertNodes(editor, emojiNode);
};
