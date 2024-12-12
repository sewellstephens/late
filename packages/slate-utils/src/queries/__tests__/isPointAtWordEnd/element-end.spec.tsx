/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-core';

import { jsx } from '@sewellstephens/plate-test-utils';
import { Range } from 'slate';

import { isPointAtWordEnd } from '../../isPointAtWordEnd';

jsx;

const input = (
  <editor>
    <hp>
      test
      <cursor />
    </hp>
  </editor>
) as any as SlateEditor;

const at = Range.start(input.selection as Range);

const output = true;

it('should be', () => {
  expect(isPointAtWordEnd(input, { at })).toEqual(output);
});
