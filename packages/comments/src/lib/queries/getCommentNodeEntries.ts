import { type SlateEditor, getNodeEntries } from '@sewell_stephens/late-common';

import type { TCommentText } from '../types';

import { isCommentText } from '../utils';

export const getCommentNodeEntries = (editor: SlateEditor) => {
  return [
    ...getNodeEntries<TCommentText>(editor, {
      at: [],
      match: (n) => isCommentText(n),
    }),
  ];
};
