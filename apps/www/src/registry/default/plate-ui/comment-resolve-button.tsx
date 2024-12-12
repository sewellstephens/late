'use client';

import React from 'react';

import { cn } from '@sewellstephens/cn';
import {
  CommentResolveButton as CommentResolveButtonPrimitive,
  useComment,
} from '@sewellstephens/plate-comments/react';

import { Icons } from '@/components/icons';

import { buttonVariants } from './button';

export function CommentResolveButton() {
  const comment = useComment()!;

  return (
    <CommentResolveButtonPrimitive
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'h-6 p-1 text-muted-foreground'
      )}
    >
      {comment.isResolved ? (
        <Icons.refresh className="size-4" />
      ) : (
        <Icons.check className="size-4" />
      )}
    </CommentResolveButtonPrimitive>
  );
}
