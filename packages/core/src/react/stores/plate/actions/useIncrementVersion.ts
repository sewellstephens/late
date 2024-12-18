import React from 'react';

import type { LateChangeKey } from '../LateStore';

import {
  type UseLateEditorStoreOptions,
  useLateActions,
} from '../createLateStore';

export const useIncrementVersion = (
  key: LateChangeKey,
  id?: string,
  options: UseLateEditorStoreOptions = {}
) => {
  const previousVersionRef = React.useRef(1);

  const set = useLateActions(id, {
    debugHookName: 'useIncrementVersion',
    ...options,
  })[key]();

  return React.useCallback(() => {
    const nextVersion = previousVersionRef.current + 1;
    set(nextVersion);
    previousVersionRef.current = nextVersion;
  }, [set]);
};
