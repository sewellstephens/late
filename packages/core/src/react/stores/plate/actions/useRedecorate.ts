import React from 'react';

import type { UseLateEditorStoreOptions } from '../createLateStore';

import { useIncrementVersion } from './useIncrementVersion';

export const useRedecorate = (
  id?: string,
  options: UseLateEditorStoreOptions = {}
) => {
  const updateDecorate = useIncrementVersion('versionDecorate', id, {
    debugHookName: 'useRedecorate',
    ...options,
  });

  return React.useCallback(() => {
    updateDecorate();
  }, [updateDecorate]);
};
