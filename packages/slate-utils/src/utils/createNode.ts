import type { TElement } from '@sewellstephens/slate';

export const createNode = (type = 'p', text = ''): TElement => ({
  children: [{ text }],
  type,
});
