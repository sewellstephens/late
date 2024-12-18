import React from 'react';

import { cn, withRef } from '@sewell_stephens/cn';
import { LateLeaf } from '@sewell_stephens/late-common/react';

export const HighlightLeaf = withRef<typeof LateLeaf>(
  ({ children, className, ...props }, ref) => (
    <LateLeaf
      asChild
      className={cn('bg-primary/20 text-inherit dark:bg-primary/40', className)}
      ref={ref}
      {...props}
    >
      <mark>{children}</mark>
    </LateLeaf>
  )
);
