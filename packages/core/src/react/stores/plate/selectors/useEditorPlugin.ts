import type {
  AnyPluginConfig,
  InferConfig,
  WithRequiredKey,
} from '../../../../lib';
import type { LateEditor } from '../../../editor';

import {
  type LatePlugin,
  type LatePluginContext,
  getEditorPlugin,
} from '../../../plugin';
import { useEditorRef } from './useEditorRef';

/** Get editor and plugin context. */
export function useEditorPlugin<
  P extends AnyPluginConfig | LatePlugin<AnyPluginConfig>,
  E extends LateEditor = LateEditor,
>(
  p: WithRequiredKey<P>
): LatePluginContext<InferConfig<P> extends never ? P : InferConfig<P>, E> {
  const editor = useEditorRef();

  return getEditorPlugin(editor, p) as any;
}
