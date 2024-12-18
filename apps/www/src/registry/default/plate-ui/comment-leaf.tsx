'use client';

import React from 'react';

import type { TCommentText } from '@sewell_stephens/late-comments';

import { cn } from '@sewell_stephens/cn';
import {
  useCommentLeaf,
  useCommentLeafState,
} from '@sewell_stephens/late-comments/react';
import { LateLeaf, type LateLeafProps } from '@sewell_stephens/late-common/react';

export function CommentLeaf({
  className,
  ...props
}: LateLeafProps<TCommentText>) {
  const { children, leaf, nodeProps } = props;

  const state = useCommentLeafState({ leaf });
  const { props: rootProps } = useCommentLeaf(state);

  if (!state.commentCount) return <>{children}</>;

  let aboveChildren = <>{children}</>;

  if (!state.isActive) {
    for (let i = 1; i < state.commentCount; i++) {
      aboveChildren = <span className="bg-primary/20">{aboveChildren}</span>;
    }
  }

  return (
    <LateLeaf
      {...props}
      className={cn(
        'border-b-2 border-b-primary/40',
        state.isActive ? 'bg-primary/40' : 'bg-primary/20',
        className
      )}
      nodeProps={{
        ...rootProps,
        ...nodeProps,
      }}
    >
      {aboveChildren}
    </LateLeaf>
  );
}
