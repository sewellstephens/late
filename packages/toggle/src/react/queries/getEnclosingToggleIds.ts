import type { SlateEditor } from '@sewellstephens/plate-common';

import { TogglePlugin } from '../TogglePlugin';

export function getEnclosingToggleIds(
  editor: SlateEditor,
  elementId: string
): string[] {
  return editor.getOptions(TogglePlugin).toggleIndex?.get(elementId) || [];
}
