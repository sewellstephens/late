import {
  type UseLateEditorStoreOptions,
  useLateSelectors,
} from '../createLateStore';

export const useEditorMounted = (
  id?: string,
  options: UseLateEditorStoreOptions = {}
): boolean => {
  return !!useLateSelectors(id, {
    debugHookName: 'useEditorMounted',
    ...options,
  }).isMounted();
};
