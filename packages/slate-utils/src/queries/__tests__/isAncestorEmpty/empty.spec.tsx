/** @jsx jsx */

import type { SlateEditor } from '@sewell_stephens/late-common';

import { jsx } from '@sewell_stephens/late-test-utils';

import { isAncestorEmpty } from '../../isAncestorEmpty';

jsx;

const input = (
  <hp>
    <cursor />
  </hp>
) as any as SlateEditor;

const output = true;

it('should be', () => {
  expect(isAncestorEmpty(input, input)).toEqual(output);
});
