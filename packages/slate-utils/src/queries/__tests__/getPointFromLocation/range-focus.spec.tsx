/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-core';

import { jsx } from '@sewellstephens/plate-test-utils';

import { getPointFromLocation } from '../../getPointFromLocation';

jsx;

const input = (
  <editor>
    <hp>
      tes
      <anchor />
      tt
      <focus />
    </hp>
  </editor>
) as any as SlateEditor;

const output = {
  offset: 5,
  path: [0, 0],
};

it('should be', () => {
  expect(getPointFromLocation(input, { focus: true })).toEqual(output);
});
