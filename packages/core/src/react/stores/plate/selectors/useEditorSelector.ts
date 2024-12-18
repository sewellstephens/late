import React from 'react';

import { selectAtom } from 'jotai/utils';

import type { LateEditor } from '../../../editor/LateEditor';

import {
  type UseLateEditorStoreOptions,
  plateStore,
  useLateSelectors,
} from '../createLateStore';

export interface UseEditorSelectorOptions<T>
  extends UseLateEditorStoreOptions {
  equalityFn?: (a: T, b: T) => boolean;
  id?: string;
}

export const useEditorSelector = <T, E extends LateEditor = LateEditor>(
  selector: (editor: E, prev?: T) => T,
  deps: React.DependencyList,
  {
    equalityFn = (a: T, b: T) => a === b,
    id,
    ...storeOptions
  }: UseEditorSelectorOptions<T> = {}
): T => {
  const selectorAtom = React.useMemo(
    () =>
      selectAtom<{ editor: E }, T>(
        plateStore.atom.trackedEditor,
        ({ editor }, prev) => selector(editor, prev),
        equalityFn
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );

  return useLateSelectors(id, {
    debugHookName: 'useEditorSelector',
    ...storeOptions,
  }).atom(selectorAtom);
};
