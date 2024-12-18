import React from 'react';

import { withRef, withVariants } from '@sewell_stephens/cn';
import { LateElement } from '@sewell_stephens/late-common/react';
import { cva } from 'class-variance-authority';

const listVariants = cva('m-0 ps-6', {
  variants: {
    variant: {
      ol: 'list-decimal',
      ul: 'list-disc [&_ul]:list-[circle] [&_ul_ul]:list-[square]',
    },
  },
});

const ListElementVariants = withVariants(LateElement, listVariants, [
  'variant',
]);

export const ListElement = withRef<typeof ListElementVariants>(
  ({ children, variant = 'ul', ...props }, ref) => {
    const Component = variant!;

    return (
      <ListElementVariants asChild ref={ref} variant={variant} {...props}>
        <Component>{children}</Component>
      </ListElementVariants>
    );
  }
);
