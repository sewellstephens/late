import { focusEditorEdge, isEditorFocused } from '@sewellstephens/slate-react';

import { createSlatePlugin } from '../../../lib';
import { withLateReact } from './withLateReact';

/** @see {@link withReact} */
export const ReactPlugin = createSlatePlugin({
  extendEditor: withLateReact,
  key: 'dom',
}).extendEditorApi(({ editor }) => {
  const { reset } = editor.api;

  return {
    reset: () => {
      const isFocused = isEditorFocused(editor);

      reset();

      if (isFocused) {
        focusEditorEdge(editor, { edge: 'start' });
      }
    },
  };
});
