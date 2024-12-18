import {
  type FindNodeOptions,
  type SlateEditor,
  findNode,
} from '@sewell_stephens/late-common';

import type { TCommentText } from '../types';

import { CommentsPlugin } from '../CommentsPlugin';

export const findCommentNode = (
  editor: SlateEditor,
  options?: FindNodeOptions
) => {
  return findNode<TCommentText>(editor, {
    match: (n) => n[CommentsPlugin.key],
    ...options,
  });
};
