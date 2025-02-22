import React from 'react';

import {
  EXPOSED_STORE_KEYS,
  useEditorRef,
  useLateStore,
  useRedecorate,
} from '../stores';

export const EditorMethodsEffect = ({ id }: { id?: string }) => {
  const editor = useEditorRef(id);
  const redecorate = useRedecorate(id);

  const plateStore = useLateStore(id);

  // Must be in a scope where hooks can be called.
  const storeSetters = Object.fromEntries(
    EXPOSED_STORE_KEYS.map((key) => [key, plateStore.set[key]()])
  ) as any;

  const memorizedStoreSetters = React.useMemo(
    () => storeSetters,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  React.useEffect(() => {
    editor.api.redecorate = redecorate;

    editor.setLateState = (optionKey, value) => {
      const setter = memorizedStoreSetters;

      setter[optionKey]?.(value);
    };
  }, [editor, redecorate, memorizedStoreSetters]);

  return null;
};
