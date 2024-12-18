import React from 'react';
import { withRef, withVariants } from '@sewell_stephens/cn';
import { LateElement } from '@sewell_stephens/late-common';
import { cva } from 'class-variance-authority';

const listVariants = cva('m-0 ps-6', {
  variants: {
    variant: {
      ul: 'list-disc [&_ul]:list-[circle] [&_ul_ul]:list-[square]',
      ol: 'list-decimal',
    },
  },
});

const ListElementVariants = withVariants(LateElement, listVariants, [
  'variant',
]);

export const ListElement = withRef<typeof ListElementVariants>(
  ({ className, children, variant = 'ul', ...props }, ref) => {
    const Component = variant!;

    return (
      <ListElementVariants ref={ref} asChild {...props}>
        <Component>{children}</Component>
      </ListElementVariants>
    );
  }
);
