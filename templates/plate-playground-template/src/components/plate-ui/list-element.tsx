import React from 'react';
import { withRef, withVariants } from '@sewellstephens/cn';
import { LateElement } from '@sewellstephens/plate-common';
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
