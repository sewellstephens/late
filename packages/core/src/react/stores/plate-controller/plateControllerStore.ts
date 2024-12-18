import React from 'react';

import type { JotaiStore } from 'jotai-x';

import { type Atom, atom } from 'jotai';

import { createAtomStore } from '../../libs';

export const {
  LateControllerProvider: LateController,
  plateControllerStore,
  useLateControllerStore,
} = createAtomStore(
  {
    activeId: atom(null as null | string),
    editorStores: atom({} as Record<string, JotaiStore | null>),
    primaryEditorIds: atom([] as string[]),
  },
  {
    name: 'plateController',
  }
);

export const useLateControllerSelectors = () => useLateControllerStore().get;

export const useLateControllerActions = () => useLateControllerStore().set;

export const useLateControllerStates = () => useLateControllerStore().use;

export const useLateControllerExists = () =>
  !!useLateControllerStore().store({ warnIfNoStore: false });

/**
 * Retrieve from LateController the JotaiStore for the editor with a given ID,
 * or the active editor if no ID is provided, or the first primary editor if no
 * editor is active, or null.
 */
export const useLateControllerEditorStore = (
  idProp?: string
): JotaiStore | null => {
  const storeAtom: Atom<JotaiStore | null> = React.useMemo(
    () =>
      atom((get) => {
        const editorStores = get(plateControllerStore.atom.editorStores);

        const forId = (id: null | string): JotaiStore | null => {
          if (!id) return null;

          return editorStores[id] ?? null;
        };

        if (idProp) return forId(idProp);

        const lookupOrder = [
          get(plateControllerStore.atom.activeId),
          ...get(plateControllerStore.atom.primaryEditorIds),
        ];

        for (const id of lookupOrder) {
          const store = forId(id);

          if (store) return store;
        }

        return null;
      }),
    [idProp]
  );

  return useLateControllerSelectors().atom(storeAtom);
};
