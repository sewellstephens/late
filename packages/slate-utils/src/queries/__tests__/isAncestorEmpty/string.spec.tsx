/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-core';

import { jsx } from '@sewellstephens/plate-test-utils';

import { isAncestorEmpty } from '../../isAncestorEmpty';

jsx;

const input = (
  <hp>
    test
    <cursor />
  </hp>
) as any as SlateEditor;

const output = false;

it('should be', () => {
  expect(isAncestorEmpty(input, input)).toEqual(output);
});
