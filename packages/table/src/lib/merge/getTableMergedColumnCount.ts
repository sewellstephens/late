import type { TElement } from '@sewellstephens/plate-common';

import { getColSpan } from '../queries';

export const getTableMergedColumnCount = (tableNode: TElement) => {
  return (tableNode.children as TElement[])?.[0]?.children?.reduce(
    (prev, cur) => prev + (getColSpan(cur as any) ?? 1),
    0
  );
};
