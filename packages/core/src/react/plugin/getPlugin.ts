import type { AnyPluginConfig, PluginConfig, WithRequiredKey } from '../../lib';
import type { LateEditor } from '../editor/LateEditor';
import type { LatePlugin } from './LatePlugin';

import { createLatePlugin } from './createLatePlugin';

/** Get editor plugin by key or plugin object. */
export function getPlugin<C extends AnyPluginConfig = PluginConfig>(
  editor: LateEditor,
  plugin: WithRequiredKey<C>
): C extends { node: any } ? C : LatePlugin<C> {
  return (
    (editor.plugins[plugin.key] as any) ??
    createLatePlugin({ key: plugin.key })
  );
}
