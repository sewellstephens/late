import React from 'react';

import { focusAtom } from 'jotai-optics';
import { useFocused } from 'slate-react';

import {
  plateControllerStore,
  useEditorId,
  useLateControllerActions,
  useLateSelectors,
  useLateStore,
} from '../stores';

export interface LateControllerEffectProps {
  id?: string;
}

export const LateControllerEffect = ({
  id: idProp,
}: LateControllerEffectProps) => {
  const idFromStore = useEditorId();
  const id = idProp ?? idFromStore;

  const currentStoreAtom = React.useMemo(
    () =>
      focusAtom(plateControllerStore.atom.editorStores, (optic) =>
        optic.prop(id)
      ),
    [id]
  );
  const setCurrentStore = useLateControllerActions().atom(currentStoreAtom, {
    warnIfNoStore: false,
  });
  const store = useLateStore(id).store();

  const primary = useLateSelectors(id).primary();
  const setPrimaryEditorIds = useLateControllerActions().primaryEditorIds({
    warnIfNoStore: false,
  });

  const focused = useFocused();
  const setActiveId = useLateControllerActions().activeId({
    warnIfNoStore: false,
  });

  React.useEffect(() => {
    setCurrentStore(store ?? null);

    return () => {
      setCurrentStore(null);
      setActiveId((activeId) => (activeId === id ? null : activeId));
    };
  }, [store, setCurrentStore, setActiveId, id]);

  React.useEffect(() => {
    if (primary) {
      setPrimaryEditorIds((ids) => [...ids, id]);

      return () => {
        setPrimaryEditorIds((ids) => ids.filter((i) => i !== id));
      };
    }
  }, [id, primary, setPrimaryEditorIds]);

  React.useEffect(() => {
    if (id && focused) {
      setActiveId(id);
    }
  }, [id, focused, setActiveId]);

  return null;
};
