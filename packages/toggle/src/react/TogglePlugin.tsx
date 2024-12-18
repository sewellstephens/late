import type { ExtendConfig } from '@sewellstephens/plate-common';

import { toTLatePlugin } from '@sewellstephens/plate-common/react';

import type { buildToggleIndex } from './toggleIndexAtom';

import {
  type ToggleConfig as BaseToggleConfig,
  TogglePlugin as BaseTogglePlugin,
} from '../lib/TogglePlugin';
import { renderToggleAboveNodes } from './renderToggleAboveNodes';
import { useHooksToggle } from './useHooksToggle';
import { withToggle } from './withToggle';

export type ToggleConfig = ExtendConfig<
  BaseToggleConfig,
  {
    toggleIndex?: ReturnType<typeof buildToggleIndex>;
  }
>;

/** Enables support for toggleable elements in the editor. */
export const TogglePlugin = toTLatePlugin<ToggleConfig>(BaseTogglePlugin, {
  extendEditor: withToggle as any,
  options: {
    toggleIndex: new Map(),
  },
  render: {
    aboveNodes: renderToggleAboveNodes,
  },
  useHooks: useHooksToggle as any,
});
