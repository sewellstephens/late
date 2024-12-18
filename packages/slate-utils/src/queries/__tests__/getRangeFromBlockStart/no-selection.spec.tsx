/** @jsx jsx */

import type { SlateEditor } from '@sewell_stephens/late-core';

import { jsx } from '@sewell_stephens/late-test-utils';

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
