/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-core';

import { jsx } from '@sewellstephens/plate-test-utils';
import { isCollapsed } from '@sewellstephens/slate';

jsx;

const input = (
  <editor>
    <hp>
      test
      <cursor />
    </hp>
  </editor>
) as any as SlateEditor;

const output = true;

it('should be', () => {
  expect(isCollapsed(input.selection)).toBe(output);
});
