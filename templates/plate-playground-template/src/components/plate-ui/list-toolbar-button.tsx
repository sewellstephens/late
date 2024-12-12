import React from 'react';
import { withRef } from '@sewellstephens/cn';
import {
  ELEMENT_UL,
  useListToolbarButton,
  useListToolbarButtonState,
} from '@sewellstephens/plate-list';

import { Icons } from '@/components/icons';

import { ToolbarButton } from './toolbar';

export const ListToolbarButton = withRef<
  typeof ToolbarButton,
  {
    nodeType?: string;
  }
>(({ nodeType = ELEMENT_UL, ...rest }, ref) => {
  const state = useListToolbarButtonState({ nodeType });
  const { props } = useListToolbarButton(state);

  return (
    <ToolbarButton
      ref={ref}
      tooltip={nodeType === ELEMENT_UL ? 'Bulleted List' : 'Numbered List'}
      {...props}
      {...rest}
    >
      {nodeType === ELEMENT_UL ? <Icons.ul /> : <Icons.ol />}
    </ToolbarButton>
  );
});