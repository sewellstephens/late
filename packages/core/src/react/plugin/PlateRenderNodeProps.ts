import type { AnyObject } from '@sewellstephens/utils';

import type { AnyPluginConfig, PluginConfig } from '../../lib';
import type { LatePluginContext } from './LatePlugin';

/** Node props passed by Late */
export type LateRenderNodeProps<C extends AnyPluginConfig = PluginConfig> = {
  className?: string;

  /** @see {@link NodeProps} */
  nodeProps?: AnyObject;
} & LatePluginContext<C>;
