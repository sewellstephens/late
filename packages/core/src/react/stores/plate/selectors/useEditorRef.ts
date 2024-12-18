import type { LateEditor } from '../../../editor/LateEditor';

import {
  type UseLateEditorStoreOptions,
  useLateSelectors,
} from '../createLateStore';

/** Get editor ref which is never updated. */
export const useEditorRef = <E extends LateEditor = LateEditor>(
  id?: string,
  options: UseLateEditorStoreOptions = {}
): E =>
  useLateSelectors(id, {
    debugHookName: 'useEditorRef',
    ...options,
  }).editor() as any;
