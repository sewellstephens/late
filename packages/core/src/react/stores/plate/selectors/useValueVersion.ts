import {
  type UseLateEditorStoreOptions,
  useLateSelectors,
} from '../createLateStore';

/** Version incremented on value change. */
export const useValueVersion = (
  id?: string,
  options: UseLateEditorStoreOptions = {}
) => {
  return useLateSelectors(id, {
    debugHookName: 'useValueVersion',
    ...options,
  }).versionValue();
};
