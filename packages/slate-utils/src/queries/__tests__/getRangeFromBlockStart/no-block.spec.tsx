/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-common';

import { jsx } from '@sewellstephens/plate-test-utils';

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
