import type {
  AnyPluginConfig,
  InferApi,
  InferOptions,
  InferTransforms,
  PluginConfig,
  SlatePlugin,
} from '../../lib';
import type {
  LatePlugin,
  LatePluginContext,
  LatePluginMethods,
} from './LatePlugin';

type LatePluginConfig<C extends AnyPluginConfig, EO = {}, EA = {}, ET = {}> = {
  api?: EA & Partial<InferApi<C>>;
  node?: Partial<LatePlugin<C>['node']>;
  options?: EO & Partial<InferOptions<C>>;
  transforms?: ET & Partial<InferTransforms<C>>;
} & Omit<
  Partial<
    LatePlugin<
      PluginConfig<
        C['key'],
        EO & InferOptions<C>,
        EA & InferApi<C>,
        ET & InferTransforms<C>
      >
    >
  >,
  'api' | 'node' | 'options' | 'transforms' | keyof LatePluginMethods
>;

const methodsToWrap: (keyof SlatePlugin)[] = [
  'configure',
  'configurePlugin',
  'extendEditorApi',
  'extendApi',
  'extendEditorTransforms',
  'extend',
  'extendPlugin',
];

/**
 * Extends a SlatePlugin to create a React LatePlugin.
 *
 * @remarks
 *   This function transforms a SlatePlugin into a React LatePlugin, allowing for
 *   React-specific functionality to be added.
 * @param basePlugin - The base SlatePlugin to be extended.
 * @param extendConfig - A function or object that provides the extension
 *   configuration. If a function, it receives the plugin context and should
 *   return a partial LatePlugin. If an object, it should be a partial
 *   LatePlugin configuration.
 * @returns A new LatePlugin that combines the base SlatePlugin functionality
 *   with React-specific features defined in the extension configuration.
 */
export function toLatePlugin<
  C extends AnyPluginConfig,
  EO = {},
  EA = {},
  ET = {},
>(
  basePlugin: SlatePlugin<C>,
  extendConfig?:
    | ((ctx: LatePluginContext<C>) => LatePluginConfig<C, EO, EA, ET>)
    | LatePluginConfig<C, EO, EA, ET>
): LatePlugin<
  PluginConfig<
    C['key'],
    EO & InferOptions<C>,
    EA & InferApi<C>,
    ET & InferTransforms<C>
  >
> {
  const plugin = { ...basePlugin } as unknown as LatePlugin;

  methodsToWrap.forEach((method) => {
    const originalMethod = plugin[method];

    (plugin as any)[method] = (...args: any[]) => {
      const slatePlugin = originalMethod(...args);

      return toLatePlugin(slatePlugin);
    };
  });

  plugin.withComponent = (component) => {
    return plugin.extend({ render: { node: component } }) as any;
  };

  if (!extendConfig) return plugin as any;

  const extendedPlugin = plugin.extend(extendConfig as any);

  return extendedPlugin as any;
}

type ExtendPluginConfig<C extends AnyPluginConfig = PluginConfig> = Omit<
  Partial<
    LatePlugin<
      PluginConfig<
        C['key'],
        Partial<InferOptions<C>>,
        Partial<InferApi<C>>,
        Partial<InferTransforms<C>>
      >
    >
  >,
  keyof LatePluginMethods
>;

/**
 * Explicitly typed version of {@link toLatePlugin}.
 *
 * @remarks
 *   This function requires explicit type parameters for both the base plugin
 *   configuration and the extension configuration. Use this when you need
 *   precise control over the plugin's type structure or when type inference
 *   doesn't provide the desired result.
 * @typeParam C - The type of the extension configuration for the LatePlugin
 *   (required).
 * @typeParam TContext - The type of the base SlatePlugin configuration
 *   (optional).
 */
export function toTLatePlugin<
  C extends AnyPluginConfig = PluginConfig,
  TContext extends AnyPluginConfig = AnyPluginConfig,
>(
  basePlugin: SlatePlugin<TContext>,
  extendConfig?:
    | ((ctx: LatePluginContext<TContext>) => ExtendPluginConfig<C>)
    | ExtendPluginConfig<C>
): LatePlugin<
  PluginConfig<C['key'], InferOptions<C>, InferApi<C>, InferTransforms<C>>
> {
  return toLatePlugin(basePlugin as any, extendConfig as any);
}
