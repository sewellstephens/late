import {
  type UseLateEditorStoreOptions,
  useLateSelectors,
} from '../createLateStore';

/** Get the editor selection (deeply memoized). */
export const useEditorSelection = (
  id?: string,
  options: UseLateEditorStoreOptions = {}
) =>
  useLateSelectors(id, {
    debugHookName: 'useEditorSelection',
    ...options,
  }).trackedSelection().selection;
