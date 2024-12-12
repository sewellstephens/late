/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-core';

import { jsx } from '@sewellstephens/plate-test-utils';

import { getPointBeforeLocation } from '../../../getPointBeforeLocation';

jsx;

const input = (
  <editor>
    <hp>
      find **test
      <cursor />
    </hp>
  </editor>
) as any as SlateEditor;

const output = {
  offset: 7,
  path: [0, 0],
};

it('should be', () => {
  expect(
    getPointBeforeLocation(input, input.selection as any, {
      afterMatch: true,
      matchString: '**',
      skipInvalid: true,
    })
  ).toEqual(output);
});
