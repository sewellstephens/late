'use client';

import React from 'react';

import { withRef } from '@sewellstephens/cn';
import { useCodeSyntaxLeaf } from '@sewellstephens/plate-code-block/react';
import { PlateLeaf } from '@sewellstephens/plate-common/react';

export const CodeSyntaxLeaf = withRef<typeof PlateLeaf>(
  ({ children, ...props }, ref) => {
    const { leaf } = props;

    const { tokenProps } = useCodeSyntaxLeaf({ leaf });

    return (
      <PlateLeaf ref={ref} {...props}>
        <span {...tokenProps}>{children}</span>
      </PlateLeaf>
    );
  }
);