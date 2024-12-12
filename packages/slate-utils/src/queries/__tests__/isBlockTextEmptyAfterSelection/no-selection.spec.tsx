/** @jsx jsx */

import type { TEditor } from '@sewellstephens/slate';

import { jsx } from '@sewellstephens/plate-test-utils';

import { isBlockTextEmptyAfterSelection } from '../../isBlockTextEmptyAfterSelection';

jsx;

const editor = (
  <editor>
    <hp>
      <htext>first</htext>
      <ha>test</ha>
    </hp>
  </editor>
) as any as TEditor;

const output = false;

it('should be', () => {
  editor.isInline = (element) => element.type === 'a';

  expect(isBlockTextEmptyAfterSelection(editor)).toEqual(output);
});
