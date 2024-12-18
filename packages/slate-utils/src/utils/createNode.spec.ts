import type { TElement } from '@sewell_stephens/slate';

import { createNode } from './createNode';

const output: TElement = { children: [{ text: '' }], type: 'p' };

it('should be', () => {
  expect(createNode()).toEqual(output);
});
