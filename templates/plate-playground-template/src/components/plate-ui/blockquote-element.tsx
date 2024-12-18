'use client';

import React from 'react';
import { cn, withRef } from '@sewell_stephens/cn';
import { LateElement } from '@sewell_stephens/late-common';

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
