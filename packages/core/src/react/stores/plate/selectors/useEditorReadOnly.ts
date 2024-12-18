import {
  type UseLateEditorStoreOptions,
  useLateSelectors,
} from '../createLateStore';

/**
 * Whether the editor is read-only. You can also use `useReadOnly` from
 * `slate-react` in node components.
 */
export const useEditorReadOnly = (
  id?: string,
  options: UseLateEditorStoreOptions = {}
): boolean => {
  return !!useLateSelectors(id, {
    debugHookName: 'useEditorReadOnly',
    ...options,
  }).readOnly();
};
