import type { TNode } from '@sewell_stephens/late-common';

import type { TCommentText } from '../types';

import { CommentsPlugin } from '../CommentsPlugin';

export const isCommentText = (node: TNode): node is TCommentText => {
  return !!node[CommentsPlugin.key];
};
