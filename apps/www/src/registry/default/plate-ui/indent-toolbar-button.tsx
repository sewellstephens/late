import React from 'react';

import { withRef } from '@sewellstephens/cn';
import { useIndentButton } from '@sewellstephens/plate-indent/react';

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