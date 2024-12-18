import type { Value } from '@sewell_stephens/slate';
import type { UnionToIntersection } from '@sewell_stephens/utils';
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
  AnyEditorLatePlugin,
  EditorLatePlugin,
  Shortcuts,
} from '../plugin/LatePlugin';
import type { EXPOSED_STORE_KEYS, LateStoreState } from '../stores';
import type { LateCorePlugin } from './withLate';

export type LateEditor = {
  api: UnionToIntersection<InferApi<LateCorePlugin>>;

  getPlugin: <C extends AnyPluginConfig = PluginConfig>(
    plugin: WithRequiredKey<C>
  ) => C extends { node: any } ? C : EditorLatePlugin<C>;

  pluginList: AnyEditorLatePlugin[];

  plugins: Record<string, AnyEditorLatePlugin>;

  setLateState: <K extends (typeof EXPOSED_STORE_KEYS)[number]>(
    optionKey: K,
    value: LateStoreState[K]
  ) => void;

  shortcuts: Shortcuts;

  // Alias for transforms
  tf: LateEditor['transforms'];

  transforms: UnionToIntersection<InferTransforms<LateCorePlugin>>;

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

export type TLateEditor<
  V extends Value = Value,
  P extends AnyPluginConfig = LateCorePlugin,
> = {
  api: UnionToIntersection<InferApi<P | LateCorePlugin>>;
  children: V;
  pluginList: P[];
  plugins: { [K in P['key']]: Extract<P, { key: K }> };
  tf: UnionToIntersection<InferTransforms<P | LateCorePlugin>>;
  transforms: UnionToIntersection<InferTransforms<P | LateCorePlugin>>;
} & LateEditor;
