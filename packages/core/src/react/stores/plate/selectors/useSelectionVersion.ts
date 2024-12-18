import {
  type UseLateEditorStoreOptions,
  useLateSelectors,
} from '../createLateStore';

/** Version incremented on selection change. */
export const useSelectionVersion = (
  id?: string,
  options: UseLateEditorStoreOptions = {}
) => {
  return useLateSelectors(id, {
    debugHookName: 'useSelectionVersion',
    ...options,
  }).versionSelection();
};
