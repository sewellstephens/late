import React from 'react';

import { cn, withRef } from '@sewellstephens/cn';
import { PlateLeaf } from '@sewellstephens/plate-common/react';

export const HighlightLeaf = withRef<typeof PlateLeaf>(
  ({ children, className, ...props }, ref) => (
    <PlateLeaf
      asChild
      className={cn('bg-primary/20 text-inherit dark:bg-primary/40', className)}
      ref={ref}
      {...props}
    >
      <mark>{children}</mark>
    </PlateLeaf>
  )
);
