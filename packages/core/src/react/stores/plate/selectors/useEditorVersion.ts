import {
  type UseLateEditorStoreOptions,
  useLateSelectors,
} from '../createLateStore';

/** Version incremented on each editor change. */
export const useEditorVersion = (
  id?: string,
  options: UseLateEditorStoreOptions = {}
) => {
  return useLateSelectors(id, {
    debugHookName: 'useEditorVersion',
    ...options,
  }).versionEditor();
};
