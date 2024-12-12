/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-common';

import { jsx } from '@sewellstephens/plate-test-utils';

import { getBlockAbove } from '../../getBlockAbove';

jsx;

const input = (
  <editor>
    <hh1>
      <hp>
        test
        <cursor />
      </hp>
    </hh1>
  </editor>
) as any as SlateEditor;

const output = <hp>test</hp>;

it('should be', () => {
  expect(getBlockAbove(input)).toEqual([output, [0, 0]]);
});
