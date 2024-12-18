'use client';

import React from 'react';

import { CommentsPlugin } from '@sewell_stephens/late-comments/react';
import { useEditorPlugin } from '@sewell_stephens/late-common/react';

import { Avatar, AvatarFallback, AvatarImage } from './avatar';

export function CommentAvatar({ userId }: { userId: null | string }) {
  const { useOption } = useEditorPlugin(CommentsPlugin);
  const user = useOption('userById', userId);

  if (!user) return null;

  return (
    <Avatar className="size-5">
      <AvatarImage alt={user.name} src={user.avatarUrl} />
      <AvatarFallback>{user.name?.[0]}</AvatarFallback>
    </Avatar>
  );
}
