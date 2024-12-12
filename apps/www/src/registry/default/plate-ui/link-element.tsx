import React from 'react';

import type { TLinkElement } from '@sewellstephens/plate-link';

import { cn, withRef } from '@sewellstephens/cn';
import { PlateElement, useElement } from '@sewellstephens/plate-common/react';
import { useLink } from '@sewellstephens/plate-link/react';

export const LinkElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    const element = useElement<TLinkElement>();
    const { props: linkProps } = useLink({ element });

    return (
      <PlateElement
        asChild
        className={cn(
          'font-medium text-primary underline decoration-primary underline-offset-4',
          className
        )}
        ref={ref}
        {...(linkProps as any)}
        {...props}
      >
        <a>{children}</a>
      </PlateElement>
    );
  }
);
