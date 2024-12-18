/** @jsx jsx */

import type { SlateEditor } from '@sewell_stephens/late-common';

import { jsx } from '@sewell_stephens/late-test-utils';

import { getRangeFromBlockStart } from '../../getRangeFromBlockStart';

jsx;

const input = (
  <editor>
    te
    <cursor />
    st
  </editor>
) as any as SlateEditor;

it('should be', () => {
  expect(getRangeFromBlockStart(input)).toEqual(undefined);
});
