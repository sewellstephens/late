import type { TEditor, TRange, Value } from '@sewell_stephens/slate';
import type { UnionToIntersection } from '@sewell_stephens/utils';
import type { KeyboardEventLike } from 'is-hotkey';
import type { SetImmerState, StoreApi } from 'zustand-x';

import type {
  AnyPluginConfig,
  InferApi,
  InferOptions,
  InferTransforms,
  PluginConfig,
  WithRequiredKey,
} from '../plugin/BasePlugin';
import type {
  AnyEditorPlugin,
  EditorPlugin,
  InjectNodeProps,
} from '../plugin/SlatePlugin';
import type { CorePlugin } from '../plugins';

export type BaseEditor = {
  currentKeyboardEvent: KeyboardEventLike | null;

  getApi: <C extends AnyPluginConfig = PluginConfig>(
    plugin?: WithRequiredKey<C>
  ) => InferApi<C>;

  getInjectProps: <C extends AnyPluginConfig = PluginConfig>(
    plugin: WithRequiredKey<C>
  ) => InjectNodeProps<C>;

  getOption: <
    C extends AnyPluginConfig,
    K extends keyof InferOptions<C>,
    F extends InferOptions<C>[K],
  >(
    plugin: WithRequiredKey<C>,
    optionKey: K,
    ...args: F extends (...args: infer A) => any ? A : never
  ) => F extends (...args: any[]) => infer R ? R : F;

  getOptions: <C extends AnyPluginConfig = PluginConfig>(
    plugin: WithRequiredKey<C>
  ) => InferOptions<C>;

  getOptionsStore: <C extends AnyPluginConfig>(
    plugin: WithRequiredKey<C>
  ) => StoreApi<C['key'], InferOptions<C>>;

  getPlugin: <C extends AnyPluginConfig = PluginConfig>(
    plugin: WithRequiredKey<C>
  ) => C extends { node: any } ? C : EditorPlugin<C>;

  getTransforms: <C extends AnyPluginConfig = PluginConfig>(
    plugin?: WithRequiredKey<C>
  ) => InferTransforms<C>;

  getType: (plugin: WithRequiredKey) => string;

  id: any;

  /**
   * Whether the editor is a fallback editor.
   *
   * @default false
   * @see {@link createLateFallbackEditor}
   */
  isFallback: boolean;

  key: any;

  pluginList: any[];

  plugins: Record<string, any>;

  prevSelection: TRange | null;

  setOption: <C extends AnyPluginConfig, K extends keyof InferOptions<C>>(
    plugin: WithRequiredKey<C>,
    optionKey: K,
    value: InferOptions<C>[K]
  ) => void;
  setOptions: {
    <C extends AnyPluginConfig>(
      plugin: WithRequiredKey<C>,
      options: Parameters<SetImmerState<InferOptions<C>>>[0]
    ): void;
    <C extends AnyPluginConfig>(
      plugin: WithRequiredKey<C>,
      options: Partial<InferOptions<C>>
    ): void;
  };
} & TEditor;

export type SlateEditor = {
  api: UnionToIntersection<InferApi<CorePlugin>>;
  pluginList: AnyEditorPlugin[];

  plugins: Record<string, AnyEditorPlugin>;

  // Alias for transforms
  tf: SlateEditor['transforms'];
  transforms: UnionToIntersection<InferTransforms<CorePlugin>>;
} & BaseEditor;

export type TSlateEditor<
  V extends Value = Value,
  P extends AnyPluginConfig = CorePlugin,
> = {
  api: UnionToIntersection<InferApi<CorePlugin | P>>;
  children: V;
  pluginList: P[];
  plugins: { [K in P['key']]: Extract<P, { key: K }> };
  tf: UnionToIntersection<InferTransforms<CorePlugin | P>>;
  transforms: UnionToIntersection<InferTransforms<CorePlugin | P>>;
} & SlateEditor;

export type InferPlugins<T extends AnyPluginConfig[]> = T[number];
