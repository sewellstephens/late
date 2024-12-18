/* eslint-disable react-hooks/rules-of-hooks */
import { type TEditor, type Value, createTEditor } from '@sewellstephens/slate';

import type { AnyLatePlugin } from '../plugin';
import type { LateApiPlugin } from '../plugins';
import type { TLateEditor } from './LateEditor';

import {
  type AnyPluginConfig,
  type BaseWithSlateOptions,
  type CorePlugin,
  type InferPlugins,
  withSlate,
} from '../../lib';
import { getLateCorePlugins } from './getLateCorePlugins';

export type LateCorePlugin = CorePlugin | typeof LateApiPlugin;

export type WithLateOptions<
  V extends Value = Value,
  P extends AnyPluginConfig = LateCorePlugin,
> = {
  rootPlugin?: (plugin: AnyLatePlugin) => AnyLatePlugin;
} & BaseWithSlateOptions<V, P> &
  Pick<
    Partial<AnyLatePlugin>,
    | 'api'
    | 'decorate'
    | 'extendEditor'
    | 'handlers'
    | 'inject'
    | 'normalizeInitialValue'
    | 'options'
    | 'override'
    | 'priority'
    | 'render'
    | 'shortcuts'
    | 'transforms'
    | 'useHooks'
  >;

/**
 * Applies Late-specific enhancements to an editor instance with ReactPlugin.
 *
 * @see {@link createLateEditor} for a higher-level React editor creation function.
 * @see {@link useLateEditor} for a memoized version in React components.
 * @see {@link withSlate} for the non-React version of editor enhancement
 */
export const withLate = <
  V extends Value = Value,
  P extends AnyPluginConfig = LateCorePlugin,
>(
  e: TEditor,
  { plugins = [], ...options }: WithLateOptions<V, P> = {}
): TLateEditor<V, InferPlugins<P[]>> => {
  const editor = withSlate<V, P>(e, {
    ...options,
    plugins: [...getLateCorePlugins(), ...plugins],
  } as any) as unknown as TLateEditor<V, InferPlugins<P[]>>;

  editor.useOptions = ((plugin: any, selector: any, equalityFn: any) => {
    const store = editor.getOptionsStore(plugin);

    if (!store) {
      editor.api.debug.error(
        `editor.useOptions: ${plugin.key} plugin is missing`,
        'PLUGIN_MISSING'
      );
    }

    return store.useStore(selector, equalityFn);
  }) as any;

  editor.useOption = (plugin: any, key: any, ...args: any) => {
    const store = editor.getOptionsStore(plugin);

    if (!store) {
      editor.api.debug.error(
        `editor.useOption: ${plugin.key} plugin is missing`,
        'PLUGIN_MISSING'
      );
    }

    const useState = (store as any)?.use[key];

    if (useState) {
      return useState(...args);
    }

    editor.api.debug.error(
      `editor.useOption: ${key} option is not defined in plugin ${plugin.key}`,
      'OPTION_UNDEFINED'
    );
  };

  return editor;
};

export type CreateLateEditorOptions<
  V extends Value = Value,
  P extends AnyPluginConfig = LateCorePlugin,
> = {
  /**
   * Initial editor to be extended with `withLate`.
   *
   * @default createEditor()
   */
  editor?: TEditor;
} & WithLateOptions<V, P>;

/**
 * Creates a fully configured Late editor with optional customizations.
 *
 * @remarks
 *   This function creates a Late editor with the following enhancements and
 *   configurations:
 *
 *   1. Editor Initialization:
 *
 *   - Assigns a unique ID to the editor if not already present.
 *   - Extend editor state properties.
 *
 *   2. Plugin System:
 *
 *   - Integrates core plugins and user-provided plugins.
 *   - Creates a root plugin that encapsulates all other plugins.
 *   - Resolves plugins into editor.plugins, editor.pluginList.
 *
 *   3. Content Initialization:
 *
 *   - Sets initial editor content if provided.
 *   - Ensures the editor always has content by using a default factory if empty.
 *
 *   4. Selection Handling:
 *
 *   - Applies initial selection if provided.
 *   - Supports auto-selection at start or end of the document.
 *
 *   5. Normalization:
 *
 *   - Performs initial value normalization.
 *   - Optionally applies full editor normalization.
 *
 *   6. Extensibility:
 *
 *   - Allows for deep customization through plugins and overrides.
 *   - Supports custom editor types and configurations.
 *
 *   The resulting editor is a fully-initialized Late instance, ready for use
 *   with Late components and APIs, with all core functionalities and custom
 *   plugins applied.
 * @example
 *   const editor = createLateEditor({
 *     plugins: [ParagraphPlugin, BoldPlugin],
 *     override: {
 *       components: {
 *         [ParagraphPlugin.key]: CustomParagraphComponent,
 *       },
 *     },
 *   });
 *
 * @template V - The value type.
 * @template P - The plugins type.
 * @see {@link createSlateEditor} for a non-React version of editor creation.
 *  * @see {@link useLateEditor} for a memoized version, suitable for use in React components.
 *  * @see {@link withLate} for the underlying function that applies Late enhancements to an editor.
 *  * @see {@link withSlate} for a non-React version of editor enhancement.
 */
export const createLateEditor = <
  V extends Value = Value,
  P extends AnyPluginConfig = LateCorePlugin,
>({
  editor = createTEditor(),
  ...options
}: CreateLateEditorOptions<V, P> = {}): TLateEditor<V, InferPlugins<P[]>> => {
  return withLate<V, P>(editor, options);
};
