/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-common';

import { jsx } from '@sewellstephens/plate-test-utils';

import { getPointBeforeLocation } from '../../../getPointBeforeLocation';

jsx;

const input = (
  <editor>
    <hp>
      test
      <cursor />
    </hp>
  </editor>
) as any as SlateEditor;

const output = { offset: 4, path: [0, 0] };

it('should be', () => {
  expect(
    getPointBeforeLocation(input, input.selection as any, {
      afterMatch: true,
      matchString: 'test',
      skipInvalid: true,
      unit: 'word',
    })
  ).toEqual(output);
});
