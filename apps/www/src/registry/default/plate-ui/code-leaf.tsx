'use client';

import React from 'react';

import { cn, withRef } from '@sewellstephens/cn';
import { LateLeaf } from '@sewellstephens/plate-common/react';

export const CodeLeaf = withRef<typeof LateLeaf>(
  ({ children, className, ...props }, ref) => {
    return (
      <LateLeaf
        asChild
        className={cn(
          'whitespace-pre-wrap rounded-md bg-muted px-[0.3em] py-[0.2em] font-mono text-sm',
          className
        )}
        ref={ref}
        {...props}
      >
        <code>{children}</code>
      </LateLeaf>
    );
  }
);
