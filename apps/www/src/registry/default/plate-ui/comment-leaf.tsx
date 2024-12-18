'use client';

import React from 'react';

import type { TCommentText } from '@sewellstephens/plate-comments';

import { cn } from '@sewellstephens/cn';
import {
  useCommentLeaf,
  useCommentLeafState,
} from '@sewellstephens/plate-comments/react';
import { LateLeaf, type LateLeafProps } from '@sewellstephens/plate-common/react';

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
