/** @jsx jsx */

import type { SlateEditor } from '@sewell_stephens/late-core';

import { jsx } from '@sewell_stephens/late-test-utils';

import { getPointBeforeLocation } from '../../../getPointBeforeLocation';

jsx;

const input = (
  <editor>
    <hp>
      test http://google.com
      <cursor />
    </hp>
  </editor>
) as any as SlateEditor;

const output = { offset: 5, path: [0, 0] };

it('should be', () => {
  expect(
    getPointBeforeLocation(input, input.selection as any, {
      afterMatch: true,
      matchString: ' ',
      skipInvalid: true,
    })
  ).toEqual(output);
});
