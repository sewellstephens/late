import type { TElement } from '@sewell_stephens/slate';

export const createNode = (type = 'p', text = ''): TElement => ({
  children: [{ text }],
  type,
});
