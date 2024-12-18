import React from 'react';

import { withRef } from '@sewell_stephens/cn';
import {
  useToggleToolbarButton,
  useToggleToolbarButtonState,
} from '@sewell_stephens/late-toggle/react';

import { Icons } from '@/components/icons';

import { ToolbarButton } from './toolbar';

export const ToggleToolbarButton = withRef<typeof ToolbarButton>(
  (rest, ref) => {
    const state = useToggleToolbarButtonState();
    const { props } = useToggleToolbarButton(state);

    return (
      <ToolbarButton ref={ref} tooltip="Toggle" {...props} {...rest}>
        <Icons.chevronDown />
      </ToolbarButton>
    );
  }
);
