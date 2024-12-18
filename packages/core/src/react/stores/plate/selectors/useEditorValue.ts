import {
  type UseLateEditorStoreOptions,
  useLateSelectors,
} from '../createLateStore';

/** Get the editor value (deeply memoized). */
export const useEditorValue = (
  id?: string,
  options: UseLateEditorStoreOptions = {}
) =>
  useLateSelectors(id, {
    debugHookName: 'useEditorValue',
    ...options,
  }).trackedValue().value;
