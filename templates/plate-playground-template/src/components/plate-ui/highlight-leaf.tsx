import React from 'react';
import { cn, withRef } from '@sewellstephens/cn';
import { PlateLeaf } from '@sewellstephens/plate-common';

export const HighlightLeaf = withRef<typeof PlateLeaf>(
  ({ className, children, ...props }, ref) => (
    <PlateLeaf
      ref={ref}
      asChild
      className={cn('bg-primary/20 text-inherit dark:bg-primary/40', className)}
      {...props}
    >
      <mark>{children}</mark>
    </PlateLeaf>
  )
);
