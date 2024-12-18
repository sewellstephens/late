'use client';

import React from 'react';
import { cn, withRef } from '@sewell_stephens/cn';
import { LateLeaf } from '@sewell_stephens/late-common';

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
