'use client';

import React from 'react';

import {
  SCOPE_ACTIVE_COMMENT,
  useCommentReplies,
} from '@sewell_stephens/late-comments/react';

import { CommentItem } from './comment-item';

export function CommentReplyItems() {
  const commentReplies = useCommentReplies(SCOPE_ACTIVE_COMMENT);

  return (
    <>
      {Object.keys(commentReplies).map((id) => (
        <CommentItem commentId={id} key={id} />
      ))}
    </>
  );
}
