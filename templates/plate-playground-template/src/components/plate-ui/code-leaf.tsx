'use client';

import React from 'react';
import { cn, withRef } from '@sewellstephens/cn';
import { LateLeaf } from '@sewellstephens/plate-common';

export const CodeLeaf = withRef<typeof LateLeaf>(
  ({ className, children, ...props }, ref) => {
    return (
      <LateLeaf
        ref={ref}
        asChild
        className={cn(
          'whitespace-pre-wrap rounded-md bg-muted px-[0.3em] py-[0.2em] font-mono text-sm',
          className
        )}
        {...props}
      >
        <code>{children}</code>
      </LateLeaf>
    );
  }
);
