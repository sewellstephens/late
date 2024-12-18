import React from 'react';

import { withRef } from '@sewell_stephens/cn';
import { useIndentButton } from '@sewell_stephens/late-indent/react';

import { Icons } from '@/components/icons';

import { ToolbarButton } from './toolbar';

export const IndentToolbarButton = withRef<typeof ToolbarButton>(
  (rest, ref) => {
    const { props } = useIndentButton();

    return (
      <ToolbarButton ref={ref} tooltip="Indent" {...props} {...rest}>
        <Icons.indent />
      </ToolbarButton>
    );
  }
);
