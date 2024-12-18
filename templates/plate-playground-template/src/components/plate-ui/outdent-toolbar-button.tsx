import React from 'react';
import { withRef } from '@sewell_stephens/cn';
import { useOutdentButton } from '@sewell_stephens/late-indent';

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
