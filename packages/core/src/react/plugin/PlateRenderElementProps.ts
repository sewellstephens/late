import type { TElement } from '@sewell_stephens/slate';
import type { TRenderElementProps } from '@sewell_stephens/slate-react';

import type { AnyPluginConfig, PluginConfig } from '../../lib';
import type { LateRenderNodeProps } from './LateRenderNodeProps';

/** Element props passed by Late */
export type LateRenderElementProps<
  N extends TElement = TElement,
  C extends AnyPluginConfig = PluginConfig,
> = LateRenderNodeProps<C> & TRenderElementProps<N>;
