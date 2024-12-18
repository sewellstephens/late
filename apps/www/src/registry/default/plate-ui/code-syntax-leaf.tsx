'use client';

import React from 'react';

import { withRef } from '@sewell_stephens/cn';
import { useCodeSyntaxLeaf } from '@sewell_stephens/late-code-block/react';
import { LateLeaf } from '@sewell_stephens/late-common/react';

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
