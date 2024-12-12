import React from 'react';

import { cn, withRef } from '@sewellstephens/cn';
import { PlateElement } from '@sewellstephens/plate-common/react';

export const TableRowElement = withRef<
  typeof PlateElement,
  {
    hideBorder?: boolean;
  }
>(({ children, hideBorder, ...props }, ref) => {
  return (
    <PlateElement
      asChild
      className={cn('h-full', hideBorder && 'border-none')}
      ref={ref}
      {...props}
    >
      <tr>{children}</tr>
    </PlateElement>
  );
});
