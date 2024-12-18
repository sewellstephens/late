import type { TElement } from '@sewell_stephens/late-common';

import { getColSpan } from '../queries';

export const getTableMergedColumnCount = (tableNode: TElement) => {
  return (tableNode.children as TElement[])?.[0]?.children?.reduce(
    (prev, cur) => prev + (getColSpan(cur as any) ?? 1),
    0
  );
};
