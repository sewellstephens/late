/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-common';

import { jsx } from '@sewellstephens/plate-test-utils';

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
