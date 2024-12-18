import React from 'react';

import type { TColumnElement } from '@sewellstephens/plate-layout';

import { cn, withRef } from '@sewellstephens/cn';
import { LateElement, useElement, withHOC } from '@sewellstephens/plate-common/react';
import { ResizableProvider } from '@sewellstephens/plate-resizable';
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
