import type { AnyObject } from '@sewellstephens/utils';
import type { SetImmerState, StoreApi } from 'zustand-x';

import type { Nullable } from '../types';
import type { GetInjectNodePropsOptions } from '../utils';

export type BasePlugin<C extends AnyPluginConfig = PluginConfig> = {
  /** API methods provided by this plugin. */
  api: InferApi<C>;

  /**
   * An array of plugin keys that this plugin depends on. These plugins will be
   * loaded before this plugin.
   */
  dependencies: string[];

  /**
   * Enables or disables the plugin. Used by Plate to determine if the plugin
   * should be used.
   */
  enabled?: boolean;

  inject: Nullable<{
    /**
     * Plugin keys used by {@link InjectNodeProps} and the targetPluginToInject
     * function. For plugin injection by key, use the inject.plugins property.
     *
     * @default [ParagraphPlugin.key]
     */
    targetPlugins?: string[];
  }>;

  /** Unique identifier for this plugin. */
  key: C['key'];

  /** Node-specific configuration for this plugin. */
  node: BasePluginNode;

  /** Extended properties used by any plugin as options. */
  options: InferOptions<C>;

  /** Store for managing plugin options. */
  optionsStore: StoreApi<C['key'], C['options']>;

  override: {
    /** Enable or disable plugins */
    enabled?: Partial<Record<string, boolean>>;
  };

  /**
   * Recursive plugin support to allow having multiple plugins in a single
   * plugin. Plate eventually flattens all the plugins into the editor.
   */
  plugins: any[];

  /**
   * Defines the order in which plugins are registered and executed.
   *
   * Plugins with higher priority values are registered and executed before
   * those with lower values. This affects two main aspects:
   *
   * 1. Plugin Order: Plugins with higher priority will be added to the editor
   *    earlier.
   * 2. Execution Order: For operations that involve multiple plugins (e.g., editor
   *    methods), plugins with higher priority will be processed first.
   *
   * @default 100
   */
  priority: number;

  /** Transforms (state-modifying operations) that can be applied to the editor. */
  transforms: InferTransforms<C>;
};

export type BasePluginNode = {
  /**
   * Indicates if this plugin's nodes should be rendered as elements. Used by
   * Plate for {@link NodeComponent} rendering as elements.
   */
  isElement?: boolean;

  /**
   * Indicates if this plugin's elements should be treated as inline. Used by
   * the inlineVoid core plugin.
   */
  isInline?: boolean;

  /**
   * Indicates if this plugin's nodes should be rendered as leaves. Used by
   * Plate for {@link NodeComponent} rendering as leaves.
   */
  isLeaf?: boolean;

  /**
   * Indicates if this plugin's void elements should be markable. Used by the
   * inlineVoid core plugin.
   */
  isMarkableVoid?: boolean;

  /**
   * Property used by `inlineVoid` core plugin to set elements of this `type` as
   * void.
   */
  isVoid?: boolean;

  /**
   * Specifies the type identifier for this plugin's nodes.
   *
   * For elements (when {@link isElement} is `true`):
   *
   * - The {@link NodeComponent} will be used for any node where `node.type ===
   *   type`.
   *
   * For leaves/marks (when {@link isLeaf} is `true`):
   *
   * - The {@link NodeComponent} will be used for any leaf where `node[type] ===
   *   true`.
   *
   * This property is crucial for Plate to correctly match nodes to their
   * respective plugins.
   *
   * @default plugin.key
   */
  type: string;
};

export type BaseSerializer = AnyObject;

export type BaseDeserializer = {
  /**
   * Deserialize an element. Overrides plugin.isElement.
   *
   * @default plugin.isElement
   */
  isElement?: boolean;

  /**
   * Deserialize a leaf. Overrides plugin.isLeaf.
   *
   * @default plugin.isLeaf
   */
  isLeaf?: boolean;
} & AnyObject;

export type BaseHtmlDeserializer = {
  /** List of HTML attribute names to store their values in `node.attributes`. */
  attributeNames?: string[];

  rules?: {
    /**
     * Deserialize an element:
     *
     * - If this option (string) is in the element attribute names.
     * - If this option (object) values match the element attributes.
     */
    validAttribute?: Record<string, string | string[]> | string;

    /** Valid element `className`. */
    validClassName?: string;

    /** Valid element `nodeName`. Set '*' to allow any node name. */
    validNodeName?: string | string[];

    /**
     * Valid element style values. Can be a list of string (only one match is
     * needed).
     */
    validStyle?: Partial<
      Record<keyof CSSStyleDeclaration, string | string[] | undefined>
    >;
  }[];

  /** Whether or not to include deserialized children on this node */
  withoutChildren?: boolean;
} & BaseDeserializer;

export type BaseInjectProps = {
  /**
   * Object whose keys are node values and values are classNames which will be
   * extended.
   */
  classNames?: AnyObject;

  /**
   * Default node value. The node key would be unset if the node value =
   * defaultNodeValue.
   */
  defaultNodeValue?: any;

  /** Node key to map to the styles. */
  nodeKey?: string;

  /**
   * Style key to override.
   *
   * @default nodeKey
   */
  styleKey?: keyof CSSStyleDeclaration;

  /** List of supported node values. */
  validNodeValues?: any[];
};

export type BaseTransformOptions = {
  nodeValue?: any;
  value?: any;
} & GetInjectNodePropsOptions;

// -----------------------------------------------------------------------------

export type PluginConfig<K extends string = any, O = {}, A = {}, T = {}> = {
  api: A;
  key: K;
  options: O;
  transforms: T;
};

export type ExtendConfig<C extends PluginConfig, EO = {}, EA = {}, ET = {}> = {
  api: C['api'] & EA;
  key: C['key'];
  options: C['options'] & EO;
  transforms: C['transforms'] & ET;
};

export type AnyPluginConfig = {
  api: any;
  key: any;
  options: any;
  transforms: any;
};

export type WithAnyKey<C extends AnyPluginConfig = PluginConfig> = PluginConfig<
  any,
  InferOptions<C>,
  InferApi<C>,
  InferTransforms<C>
>;

export type WithRequiredKey<P = {}> =
  | { key: string }
  | (P extends { key: string } ? P : never);

export type InferOptions<P> = P extends PluginConfig ? P['options'] : never;

export type InferApi<P> = P extends PluginConfig ? P['api'] : never;

export type InferTransforms<P> = P extends PluginConfig
  ? P['transforms']
  : never;

export type ParserOptions = {
  data: string;
  dataTransfer: DataTransfer;
};

export type BasePluginContext<C extends AnyPluginConfig = PluginConfig> = {
  api: C['api'];
  getOption: <K extends keyof InferOptions<C>, F extends InferOptions<C>[K]>(
    optionKey: K,
    ...args: F extends (...args: infer A) => any ? A : never
  ) => F extends (...args: any[]) => infer R ? R : F;
  getOptions: () => InferOptions<C>;
  setOption: <K extends keyof InferOptions<C>>(
    optionKey: K,
    value: InferOptions<C>[K]
  ) => void;
  setOptions: {
    (options: Parameters<SetImmerState<InferOptions<C>>>[0]): void;
    (options: Partial<InferOptions<C>>): void;
  };
  tf: C['transforms'];
  type: string;
};
