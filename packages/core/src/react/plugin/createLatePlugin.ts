import type { Modify } from '@sewell_stephens/utils';

import type { LateEditor } from '../editor/LateEditor';
import type { LatePlugin, LatePluginMethods } from './LatePlugin';

import {
  type AnyPluginConfig,
  type PluginConfig,
  createSlatePlugin,
} from '../../lib';
import { toLatePlugin } from './toLatePlugin';

type LatePluginConfig<K extends string = any, O = {}, A = {}, T = {}> = Omit<
  Partial<
    Modify<
      LatePlugin<PluginConfig<K, O, A, T>>,
      {
        node: Partial<LatePlugin<PluginConfig<K, O, A, T>>['node']>;
      }
    >
  >,
  'optionsStore' | 'useOptionsStore' | keyof LatePluginMethods
>;

type TLatePluginConfig<C extends AnyPluginConfig = PluginConfig> = Omit<
  Partial<
    Modify<
      LatePlugin<C>,
      {
        node: Partial<LatePlugin<C>['node']>;
      }
    >
  >,
  'optionsStore' | 'useOptionsStore' | keyof LatePluginMethods
>;

export const createLatePlugin = <
  K extends string = any,
  O = {},
  A = {},
  T = {},
>(
  config:
    | ((editor: LateEditor) => LatePluginConfig<K, O, A, T>)
    | LatePluginConfig<K, O, A, T> = {}
): LatePlugin<PluginConfig<K, O, A, T>> => {
  const plugin = createSlatePlugin(config as any);

  return toLatePlugin(plugin as any) as any;
};

/**
 * Explicitly typed version of `createLatePlugin`.
 *
 * @remarks
 *   While `createLatePlugin` uses type inference, this function requires an
 *   explicit type parameter. Use this when you need precise control over the
 *   plugin's type structure or when type inference doesn't provide the desired
 *   result.
 */
export function createTLatePlugin<C extends AnyPluginConfig = PluginConfig>(
  config:
    | ((editor: LateEditor) => TLatePluginConfig<C>)
    | TLatePluginConfig<C> = {}
): LatePlugin<C> {
  return createLatePlugin(config as any) as any;
}
