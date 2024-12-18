'use client';

import React from 'react';
import { withRef } from '@sewell_stephens/cn';
import {
  useMarkToolbarButton,
  useMarkToolbarButtonState,
} from '@sewell_stephens/late-common';

import { ToolbarButton } from './toolbar';

export const MarkToolbarButton = withRef<
  typeof ToolbarButton,
  {
    nodeType: string;
    clear?: string | string[];
  }
>(({ clear, nodeType, ...rest }, ref) => {
  const state = useMarkToolbarButtonState({ clear, nodeType });
  const { props } = useMarkToolbarButton(state);

  return <ToolbarButton ref={ref} {...props} {...rest} />;
});
