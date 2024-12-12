'use client';

import React from 'react';

import { cn, withRef } from '@sewellstephens/cn';
import { PlateElement } from '@sewellstephens/plate-common/react';

export const BlockquoteElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    return (
      <PlateElement
        asChild
        className={cn('my-1 border-l-2 pl-6 italic', className)}
        ref={ref}
        {...props}
      >
        <blockquote>{children}</blockquote>
      </PlateElement>
    );
  }
);