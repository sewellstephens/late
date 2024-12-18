import type { DescendantOf, TEditor, TOperation } from '@sewell_stephens/slate';

/** Get typed editor operations. */
export const getOperations = <E extends TEditor>(editor: E) =>
  editor.operations as TOperation<DescendantOf<E>>[];
