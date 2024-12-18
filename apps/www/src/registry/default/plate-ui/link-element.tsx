import React from 'react';

import type { TLinkElement } from '@sewell_stephens/late-link';

import { cn, withRef } from '@sewell_stephens/cn';
import { LateElement, useElement } from '@sewell_stephens/late-common/react';
import { useLink } from '@sewell_stephens/late-link/react';

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
