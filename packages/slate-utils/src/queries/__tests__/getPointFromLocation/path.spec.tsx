/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-common';

import { jsx } from '@sewellstephens/plate-test-utils';

import { getPointFromLocation } from '../../getPointFromLocation';

jsx;

const input = (
  <editor>
    <hp>
      test
      <cursor />
    </hp>
  </editor>
) as any as SlateEditor;

const output = {
  offset: 0,
  path: [0, 0],
};

it('should be', () => {
  expect(getPointFromLocation(input, { at: [0, 0] })).toEqual(output);
});
