import { type SlateEditor, someNode } from '@sewell_stephens/late-common';

import { TogglePlugin } from '../TogglePlugin';

export const someToggle = (editor: SlateEditor) => {
  return (
    !!editor.selection &&
    someNode(editor, {
      match: (n) => n.type === TogglePlugin.key,
    })
  );
};
