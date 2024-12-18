import React from 'react';

import { cn, withRef } from '@sewellstephens/cn';
import { LateElement } from '@sewellstephens/plate-common/react';

export const TableRowElement = withRef<
  typeof LateElement,
  {
    hideBorder?: boolean;
  }
>(({ children, hideBorder, ...props }, ref) => {
  return (
    <LateElement
      asChild
      className={cn('h-full', hideBorder && 'border-none')}
      ref={ref}
      {...props}
    >
      <tr>{children}</tr>
    </LateElement>
  );
});
