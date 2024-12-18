import React from 'react';

import { withRef } from '@sewell_stephens/cn';
import {
  type ImagePlugin,
  type MediaEmbedPlugin,
  useMediaToolbarButton,
} from '@sewell_stephens/late-media/react';

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
