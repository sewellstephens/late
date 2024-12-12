'use client';

import React from 'react';

import { withRef } from '@sewellstephens/cn';
import {
  useMarkToolbarButton,
  useMarkToolbarButtonState,
} from '@sewellstephens/plate-common/react';

import { ToolbarButton } from './toolbar';

export const MarkToolbarButton = withRef<
  typeof ToolbarButton,
  {
    clear?: string | string[];
    nodeType: string;
  }
>(({ clear, nodeType, ...rest }, ref) => {
  const state = useMarkToolbarButtonState({ clear, nodeType });
  const { props } = useMarkToolbarButton(state);

  return <ToolbarButton ref={ref} {...props} {...rest} />;
});