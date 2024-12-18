import React from 'react';
import { cn, withRef } from '@sewellstephens/cn';
import { LateElement } from '@sewellstephens/plate-common';

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
