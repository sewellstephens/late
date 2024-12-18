import { toLatePlugin } from '@sewell_stephens/late-common/react';

import { KbdPlugin as BaseKbdPlugin } from '../lib/KbdPlugin';

/** Enables support for code formatting with React-specific features */
export const KbdPlugin = toLatePlugin(BaseKbdPlugin);
