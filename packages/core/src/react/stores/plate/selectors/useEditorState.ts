import type { LateEditor } from '../../../editor/LateEditor';

import {
  type UseLateEditorStoreOptions,
  useLateSelectors,
} from '../createLateStore';

/** Get editor state which is updated on editor change. */
export const useEditorState = <E extends LateEditor = LateEditor>(
  id?: string,
  options: UseLateEditorStoreOptions = {}
): E => {
  return useLateSelectors(id, {
    debugHookName: 'useEditorState',
    ...options,
  }).trackedEditor().editor;
};
