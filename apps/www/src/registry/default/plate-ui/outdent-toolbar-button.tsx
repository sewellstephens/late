import React from 'react';

import { withRef } from '@sewellstephens/cn';
import { useOutdentButton } from '@sewellstephens/plate-indent/react';

import { Icons } from '@/components/icons';

import { ToolbarButton } from './toolbar';

export const OutdentToolbarButton = withRef<typeof ToolbarButton>(
  (rest, ref) => {
    const { props } = useOutdentButton();

    return (
      <ToolbarButton ref={ref} tooltip="Outdent" {...props} {...rest}>
        <Icons.outdent />
      </ToolbarButton>
    );
  }
);
