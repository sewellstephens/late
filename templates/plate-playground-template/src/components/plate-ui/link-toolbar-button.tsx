import React from 'react';
import { withRef } from '@sewellstephens/cn';
import {
  useLinkToolbarButton,
  useLinkToolbarButtonState,
} from '@sewellstephens/plate-link';

import { Icons } from '@/components/icons';

import { ToolbarButton } from './toolbar';

export const LinkToolbarButton = withRef<typeof ToolbarButton>((rest, ref) => {
  const state = useLinkToolbarButtonState();
  const { props } = useLinkToolbarButton(state);

  return (
    <ToolbarButton ref={ref} tooltip="Link" {...props} {...rest}>
      <Icons.link />
    </ToolbarButton>
  );
});
