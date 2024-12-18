'use client';

import React from 'react';

import { withRef } from '@sewellstephens/cn';
import { useCodeSyntaxLeaf } from '@sewellstephens/plate-code-block/react';
import { LateLeaf } from '@sewellstephens/plate-common/react';

export const CodeSyntaxLeaf = withRef<typeof LateLeaf>(
  ({ children, ...props }, ref) => {
    const { leaf } = props;

    const { tokenProps } = useCodeSyntaxLeaf({ leaf });

    return (
      <LateLeaf ref={ref} {...props}>
        <span {...tokenProps}>{children}</span>
      </LateLeaf>
    );
  }
);
