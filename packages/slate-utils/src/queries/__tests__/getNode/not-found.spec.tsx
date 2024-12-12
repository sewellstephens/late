/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-core';

import { jsx } from '@sewellstephens/plate-test-utils';
import { getNode } from '@sewellstephens/slate';

jsx;

const input = (
  <editor>
    <hp>
      test
      <cursor />
    </hp>
  </editor>
) as any as SlateEditor;

it('should be', () => {
  expect(getNode(input, [0, 0, 0])).toBeNull();
});
