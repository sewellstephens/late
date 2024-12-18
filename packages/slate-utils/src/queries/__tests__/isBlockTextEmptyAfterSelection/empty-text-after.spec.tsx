/** @jsx jsx */

import type { TEditor } from '@sewell_stephens/slate';

import { jsx } from '@sewell_stephens/late-test-utils';

import { isBlockTextEmptyAfterSelection } from '../../isBlockTextEmptyAfterSelection';

jsx;

const editor = (
  <editor>
    <hp>
      <htext>first</htext>
      <ha>
        test
        <cursor />
      </ha>
      <htext />
    </hp>
  </editor>
) as any as TEditor;

const output = true;

it('should be', () => {
  editor.isInline = (element) => element.type === 'a';

  expect(isBlockTextEmptyAfterSelection(editor)).toEqual(output);
});
