import React from 'react';

import type { TLinkElement } from '@sewellstephens/plate-link';

import { cn, withRef } from '@sewellstephens/cn';
import { LateElement, useElement } from '@sewellstephens/plate-common/react';
import { useLink } from '@sewellstephens/plate-link/react';

export const LinkElement = withRef<typeof LateElement>(
  ({ children, className, ...props }, ref) => {
    const element = useElement<TLinkElement>();
    const { props: linkProps } = useLink({ element });

    return (
      <LateElement
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
      </LateElement>
    );
  }
);
