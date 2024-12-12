import React from 'react';
import { cn, withRef } from '@sewellstephens/cn';
import { PlateElement } from '@sewellstephens/plate-common';

export const TableRowElement = withRef<
  typeof PlateElement,
  {
    hideBorder?: boolean;
  }
>(({ hideBorder, children, ...props }, ref) => {
  return (
    <PlateElement
      asChild
      ref={ref}
      className={cn('h-full', hideBorder && 'border-none')}
      {...props}
    >
      <tr>{children}</tr>
    </PlateElement>
  );
});
