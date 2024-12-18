import React from 'react';
import { cn, withRef } from '@sewell_stephens/cn';
import { LateLeaf } from '@sewell_stephens/late-common';

export const HighlightLeaf = withRef<typeof LateLeaf>(
  ({ className, children, ...props }, ref) => (
    <LateLeaf
      ref={ref}
      asChild
      className={cn('bg-primary/20 text-inherit dark:bg-primary/40', className)}
      {...props}
    >
      <mark>{children}</mark>
    </LateLeaf>
  )
);
