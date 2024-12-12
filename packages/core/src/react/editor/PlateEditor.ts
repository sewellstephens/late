import type { Value } from '@sewellstephens/slate';
import type { UnionToIntersection } from '@sewellstephens/utils';
import type { EqualityChecker } from 'zustand-x';

import type {
  AnyPluginConfig,
  BaseEditor,
  InferApi,
  InferOptions,
  InferTransforms,
  PluginConfig,
  WithRequiredKey,
} from '../../lib';
import type {
  AnyEditorPlatePlugin,
  EditorPlatePlugin,
  Shortcuts,
} from '../plugin/PlatePlugin';
import type { EXPOSED_STORE_KEYS, PlateStoreState } from '../stores';
import type { PlateCorePlugin } from './withPlate';

export type PlateEditor = {
  api: UnionToIntersection<InferApi<PlateCorePlugin>>;

  getPlugin: <C extends AnyPluginConfig = PluginConfig>(
    plugin: WithRequiredKey<C>
  ) => C extends { node: any } ? C : EditorPlatePlugin<C>;

  pluginList: AnyEditorPlatePlugin[];

  plugins: Record<string, AnyEditorPlatePlugin>;

  setPlateState: <K extends (typeof EXPOSED_STORE_KEYS)[number]>(
    optionKey: K,
    value: PlateStoreState[K]
  ) => void;

  shortcuts: Shortcuts;

  // Alias for transforms
  tf: PlateEditor['transforms'];

  transforms: UnionToIntersection<InferTransforms<PlateCorePlugin>>;

  useOption: {
    <
      C extends AnyPluginConfig,
      K extends keyof InferOptions<C>,
      F extends InferOptions<C>[K],
      Args extends Parameters<((...args: any[]) => any) & F>,
    >(
      plugin: WithRequiredKey<C>,
      optionKey: K,
      ...args: Args
    ): F extends (...args: any[]) => any ? ReturnType<F> : F;

    <
      C extends AnyPluginConfig,
      K extends keyof InferOptions<C>,
      F extends InferOptions<C>[K],
    >(
      plugin: WithRequiredKey<C>,
      optionKey: K
    ): F extends (...args: any[]) => any ? never : F;
  };

  useOptions: {
    <C extends AnyPluginConfig, U>(
      plugin: WithRequiredKey<C>,
      selector: (s: InferOptions<C>) => U,
      equalityFn?: EqualityChecker<U>
    ): U;
    <C extends AnyPluginConfig>(plugin: WithRequiredKey<C>): InferOptions<C>;
  };
} & BaseEditor;

export type TPlateEditor<
  V extends Value = Value,
  P extends AnyPluginConfig = PlateCorePlugin,
> = {
  api: UnionToIntersection<InferApi<P | PlateCorePlugin>>;
  children: V;
  pluginList: P[];
  plugins: { [K in P['key']]: Extract<P, { key: K }> };
  tf: UnionToIntersection<InferTransforms<P | PlateCorePlugin>>;
  transforms: UnionToIntersection<InferTransforms<P | PlateCorePlugin>>;
} & PlateEditor;
