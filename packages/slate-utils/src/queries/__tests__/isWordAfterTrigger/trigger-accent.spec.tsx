/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-core';

import { jsx } from '@sewellstephens/plate-test-utils';
import { Range } from 'slate';

import { isWordAfterTrigger } from '../../isWordAfterTrigger';

jsx;

const input = (
  <editor>
    <hp>
      @pré
      <cursor /> test2
    </hp>
  </editor>
) as any as SlateEditor;

const at = Range.start(input.selection as Range);

const output = 'pré';

it('should be', () => {
  expect(isWordAfterTrigger(input, { at, trigger: '@' }).match?.[1]).toBe(
    output
  );
});
