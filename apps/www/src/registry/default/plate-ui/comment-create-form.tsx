'use client';

import React from 'react';

import { cn } from '@sewell_stephens/cn';
import {
  CommentNewSubmitButton,
  CommentNewTextarea,
  CommentsPlugin,
} from '@sewell_stephens/late-comments/react';
import { useEditorPlugin } from '@sewell_stephens/late-common/react';

import { buttonVariants } from './button';
import { CommentAvatar } from './comment-avatar';
import { inputVariants } from './input';

export function CommentCreateForm() {
  const { useOption } = useEditorPlugin(CommentsPlugin);

  const myUserId = useOption('myUserId');

  return (
    <div className="flex w-full space-x-2">
      <CommentAvatar userId={myUserId} />

      <div className="flex grow flex-col items-end gap-2">
        <CommentNewTextarea className={inputVariants()} />

        <CommentNewSubmitButton
          className={cn(buttonVariants({ size: 'sm' }), 'w-[90px]')}
        >
          Comment
        </CommentNewSubmitButton>
      </div>
    </div>
  );
}
