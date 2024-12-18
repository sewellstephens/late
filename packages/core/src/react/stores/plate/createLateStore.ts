import React from 'react';

import type { JotaiStore } from 'jotai-x';

import { atom, createStore } from 'jotai';

import type { LateEditor } from '../../editor/LateEditor';
import type { LateStoreState } from './LateStore';

import { createAtomStore } from '../../libs';
import { createLateFallbackEditor } from '../../utils';
import {
  useLateControllerEditorStore,
  useLateControllerExists,
} from '../plate-controller';

export const PLATE_SCOPE = 'plate';

export const GLOBAL_PLATE_SCOPE = Symbol('global-plate');

export const createLateStore = <E extends LateEditor = LateEditor>({
  decorate = null,
  editor = createLateFallbackEditor() as E,
  id,
  isMounted = false,
  onChange = null,
  onSelectionChange = null,
  onValueChange = null,
  primary = true,
  readOnly = null,
  renderElement = null,
  renderLeaf = null,
  versionDecorate = 1,
  versionEditor = 1,
  versionSelection = 1,
  versionValue = 1,
  ...state
}: Partial<LateStoreState<E>> = {}) =>
  createAtomStore(
    {
      decorate,
      editor,
      isMounted,
      onChange,
      onSelectionChange,
      onValueChange,
      primary,
      readOnly,
      renderElement,
      renderLeaf,
      versionDecorate,
      versionEditor,
      versionSelection,
      versionValue,
      ...state,
    } as LateStoreState<E>,
    {
      extend: (atoms) => ({
        trackedEditor: atom((get) => ({
          editor: get(atoms.editor),
          version: get(atoms.versionEditor),
        })),
        trackedSelection: atom((get) => ({
          selection: get(atoms.editor).selection,
          version: get(atoms.versionSelection),
        })),
        trackedValue: atom((get) => ({
          value: get(atoms.editor).children,
          version: get(atoms.versionValue),
        })),
      }),
      name: 'plate',
    }
  );

export const {
  LateProvider: LateStoreProvider,
  plateStore,
  useLateStore,
} = createLateStore();

export interface UseLateEditorStoreOptions {
  debugHookName?: string;
}

export const useLateEditorStore = (
  id?: string,
  { debugHookName = 'useLateEditorStore' }: UseLateEditorStoreOptions = {}
): JotaiStore => {
  // Try to fetch the store from a Late provider
  const localStore = useLateStore(id).store({ warnIfNoStore: false }) ?? null;

  /**
   * To preserve hook order, only use `localStore` if it was present on first
   * render. This lets us call `useLateControllerEditorStore` conditionally.
   */
  const [localStoreExists] = React.useState(!!localStore);

  // If no store was found, try to fetch the store from a LateController
  const store = localStoreExists
    ? localStore
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      useLateControllerEditorStore(id);

  /**
   * If we still have no store, there are two possibilities.
   *
   * Case 1: There is neither a Late nor a LateController above us in the
   * tree. In this case, throw an error, since calling the hook will never
   * work.
   *
   * Case 2: There is a LateController, but it has no active editor. In this
   * case, return a fallback store until an editor becomes active.
   */
  const plateControllerExists = useLateControllerExists();
  const fallbackStore = React.useMemo(() => createStore(), []);

  if (!store) {
    if (plateControllerExists) {
      return fallbackStore;
    }

    throw new Error(
      `${debugHookName} must be used inside a Late or LateController`
    );
  }

  return store;
};

export const useLateSelectors = (
  id?: string,
  options?: UseLateEditorStoreOptions
) => {
  const store = useLateEditorStore(id, {
    debugHookName: 'useLateSelectors',
    ...options,
  });

  return useLateStore({ store }).get;
};

export const useLateActions = (
  id?: string,
  options?: UseLateEditorStoreOptions
) => {
  const store = useLateEditorStore(id, {
    debugHookName: 'useLateActions',
    ...options,
  });

  return useLateStore({ store }).set;
};

export const useLateStates = (
  id?: string,
  options?: UseLateEditorStoreOptions
) => {
  const store = useLateEditorStore(id, {
    debugHookName: 'useLateStates',
    ...options,
  });

  return useLateStore({ store }).use;
};
