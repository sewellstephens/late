import React from 'react';

import { withRef } from '@sewellstephens/cn';
import {
  type ImagePlugin,
  type MediaEmbedPlugin,
  useMediaToolbarButton,
} from '@sewellstephens/plate-media/react';

import { Icons } from '@/components/icons';

import { ToolbarButton } from './toolbar';

export const MediaToolbarButton = withRef<
  typeof ToolbarButton,
  {
    nodeType?: typeof ImagePlugin.key | typeof MediaEmbedPlugin.key;
  }
>(({ nodeType, ...rest }, ref) => {
  const { props } = useMediaToolbarButton({ nodeType });

  return (
    <ToolbarButton ref={ref} {...props} {...rest}>
      <Icons.image />
    </ToolbarButton>
  );
});