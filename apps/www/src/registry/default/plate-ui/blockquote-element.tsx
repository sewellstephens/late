'use client';

import React from 'react';

import { cn, withRef } from '@sewellstephens/cn';
import { LateElement } from '@sewellstephens/plate-common/react';

export const BlockquoteElement = withRef<typeof LateElement>(
  ({ children, className, ...props }, ref) => {
    return (
      <LateElement
        asChild
        className={cn('my-1 border-l-2 pl-6 italic', className)}
        ref={ref}
        {...props}
      >
        <blockquote>{children}</blockquote>
      </LateElement>
    );
  }
);
