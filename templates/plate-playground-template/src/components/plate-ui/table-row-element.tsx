import React from 'react';
import { cn, withRef } from '@sewell_stephens/cn';
import { LateElement } from '@sewell_stephens/late-common';

export const TableRowElement = withRef<
  typeof LateElement,
  {
    hideBorder?: boolean;
  }
>(({ hideBorder, children, ...props }, ref) => {
  return (
    <LateElement
      asChild
      ref={ref}
      className={cn('h-full', hideBorder && 'border-none')}
      {...props}
    >
      <tr>{children}</tr>
    </LateElement>
  );
});
