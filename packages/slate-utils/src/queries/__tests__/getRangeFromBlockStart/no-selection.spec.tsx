/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-core';

import { jsx } from '@sewellstephens/plate-test-utils';

import { getRangeFromBlockStart } from '../../getRangeFromBlockStart';

jsx;

const input = (
  <editor>
    <hp>test</hp>
  </editor>
) as any as SlateEditor;

const output = undefined;

it('should be', () => {
  expect(getRangeFromBlockStart(input)).toEqual(output);
});
