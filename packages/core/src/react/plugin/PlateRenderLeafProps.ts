import type { TText } from '@sewellstephens/slate';
import type { TRenderLeafProps } from '@sewellstephens/slate-react';

import type { AnyPluginConfig, PluginConfig } from '../../lib';
import type { LateRenderNodeProps } from './LateRenderNodeProps';

/** Leaf props passed by Late */
export type LateRenderLeafProps<
  N extends TText = TText,
  C extends AnyPluginConfig = PluginConfig,
> = LateRenderNodeProps<C> & TRenderLeafProps<N>;
