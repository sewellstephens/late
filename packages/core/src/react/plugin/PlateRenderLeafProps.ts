import type { TText } from '@sewellstephens/slate';
import type { TRenderLeafProps } from '@sewellstephens/slate-react';

import type { AnyPluginConfig, PluginConfig } from '../../lib';
import type { PlateRenderNodeProps } from './PlateRenderNodeProps';

/** Leaf props passed by Plate */
export type PlateRenderLeafProps<
  N extends TText = TText,
  C extends AnyPluginConfig = PluginConfig,
> = PlateRenderNodeProps<C> & TRenderLeafProps<N>;
