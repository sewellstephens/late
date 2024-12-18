import type { TElement } from '@sewellstephens/slate';
import type { TRenderElementProps } from '@sewellstephens/slate-react';

import type { AnyPluginConfig, PluginConfig } from '../../lib';
import type { LateRenderNodeProps } from './LateRenderNodeProps';

/** Element props passed by Late */
export type LateRenderElementProps<
  N extends TElement = TElement,
  C extends AnyPluginConfig = PluginConfig,
> = LateRenderNodeProps<C> & TRenderElementProps<N>;
