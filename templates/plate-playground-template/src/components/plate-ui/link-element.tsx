import React from 'react';
import { cn, withRef } from '@sewellstephens/cn';
import { LateElement, useElement } from '@sewellstephens/plate-common/react';
import { TLinkElement, useLink } from '@sewellstephens/plate-link';

export const LinkElement = withRef<typeof LateElement>(
  ({ className, children, ...props }, ref) => {
    const element = useElement<TLinkElement>();
    const { props: linkProps } = useLink({ element });

    return (
      <LateElement
        ref={ref}
        asChild
        className={cn(
          'font-medium text-primary underline decoration-primary underline-offset-4',
          className
        )}
        {...(linkProps as any)}
        {...props}
      >
        <a>{children}</a>
      </LateElement>
    );
  }
);
