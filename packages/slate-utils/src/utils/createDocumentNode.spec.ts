import type { Value } from '@sewell_stephens/slate';

import { createDocumentNode } from '@sewell_stephens/slate-utils';

const output: Value = [
  {
    children: [
      {
        children: [{ text: '' }],
        type: 'p',
      },
    ],
  } as any,
];

it('should be', () => {
  expect(createDocumentNode()).toEqual(output);
});
