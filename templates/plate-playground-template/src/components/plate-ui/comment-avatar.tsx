'use client';

import React from 'react';
import { useUserById } from '@sewell_stephens/late-comments';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/plate-ui/avatar';

export function CommentAvatar({ userId }: { userId: string | null }) {
  const user = useUserById(userId);
  if (!user) return null;

  return (
    <Avatar className="size-5">
      <AvatarImage src={user.avatarUrl} alt={user.name} />
      <AvatarFallback>{user.name?.[0]}</AvatarFallback>
    </Avatar>
  );
}
