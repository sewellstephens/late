/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-core';

import { jsx } from '@sewellstephens/plate-test-utils';

import { getSelectionText } from '../../getSelectionText';

jsx;

const input = (
  <editor>
    <hp>
      <anchor />
      test
      <focus />
    </hp>
  </editor>
) as any as SlateEditor;

const output = 'test';

it('should be', () => {
  expect(getSelectionText(input)).toBe(output);
});
