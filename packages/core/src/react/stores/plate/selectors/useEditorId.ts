import { useLateSelectors } from '../createLateStore';

/** Get the closest `Late` id. */
export const useEditorId = (): string =>
  useLateSelectors(undefined, { debugHookName: 'useEditorId' }).editor().id;
