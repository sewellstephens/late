import type { Value } from '@sewell_stephens/slate';

import type { LateEditor } from '../editor/LateEditor';

import { getEditorPlugin } from '../plugin/getEditorPlugin';

export const pipeOnChange = (editor: LateEditor, value: Value) => {
  return editor.pluginList.some((plugin) => {
    const handler = plugin.handlers.onChange;

    if (!handler) {
      return false;
    }

    // The custom event handler may return a boolean to specify whether the event
    // shall be treated as being handled or not.
    const shouldTreatEventAsHandled = handler({
      ...(getEditorPlugin(editor, plugin) as any),
      value,
    });

    if (shouldTreatEventAsHandled != null) {
      return shouldTreatEventAsHandled;
    }

    return false;
  });
};
