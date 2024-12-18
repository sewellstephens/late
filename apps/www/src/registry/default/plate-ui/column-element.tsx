import React from 'react';

import type { TColumnElement } from '@sewell_stephens/late-layout';

import { cn, withRef } from '@sewell_stephens/cn';
import { LateElement, useElement, withHOC } from '@sewell_stephens/late-common/react';
import { ResizableProvider } from '@sewell_stephens/late-resizable';
import { useReadOnly } from 'slate-react';

export const ColumnElement = withHOC(
  ResizableProvider,
  withRef<typeof LateElement>(({ children, className, ...props }, ref) => {
    const readOnly = useReadOnly();
    const { width } = useElement<TColumnElement>();

    return (
      <LateElement
        className={cn(
          className,
          !readOnly && 'rounded-lg border border-dashed p-1.5'
        )}
        ref={ref}
        style={{ width }}
        {...props}
      >
        {children}
      </LateElement>
    );
  })
);
