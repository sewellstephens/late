import type { LateEditor } from '../editor';
import type {
  InferConfig,
  LatePlugin,
  LatePluginContext,
} from './LatePlugin';

import {
  type AnyPluginConfig,
  type WithRequiredKey,
  getEditorPlugin as getBaseEditorPlugin,
} from '../../lib';

export function getEditorPlugin<
  P extends AnyPluginConfig | LatePlugin<AnyPluginConfig>,
>(
  editor: LateEditor,
  plugin: WithRequiredKey<P>
): LatePluginContext<InferConfig<P> extends never ? P : InferConfig<P>> {
  return {
    ...(getBaseEditorPlugin(editor, plugin) as any),
    useOption: (key: any, ...args: any) =>
      editor.useOption(plugin, key, ...args),
  };
}
