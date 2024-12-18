'use client';

import React from 'react';
import { cn, withRef } from '@sewellstephens/cn';
import { LateElement } from '@sewellstephens/plate-common';

export const BlockquoteElement = withRef<typeof LateElement>(
  ({ className, children, ...props }, ref) => {
    return (
      <LateElement
        ref={ref}
        asChild
        className={cn('my-1 border-l-2 pl-6 italic', className)}
        {...props}
      >
        <blockquote>{children}</blockquote>
      </LateElement>
    );
  }
);
