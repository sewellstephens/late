import type { Value } from '@sewellstephens/slate';

import { createDocumentNode } from '@sewellstephens/slate-utils';

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
