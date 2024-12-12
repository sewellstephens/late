import type { TElement } from '@sewellstephens/slate';
import type { TRenderElementProps } from '@sewellstephens/slate-react';

import type { AnyPluginConfig, PluginConfig } from '../../lib';
import type { PlateRenderNodeProps } from './PlateRenderNodeProps';

/** Element props passed by Plate */
export type PlateRenderElementProps<
  N extends TElement = TElement,
  C extends AnyPluginConfig = PluginConfig,
> = PlateRenderNodeProps<C> & TRenderElementProps<N>;
