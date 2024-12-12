/** @jsx jsx */

import { jsx } from '@sewellstephens/plate-test-utils';
import { selectEndOfBlockAboveSelection } from '@sewellstephens/slate-utils';

import type { SlateEditor } from '../../../editor';

jsx;

const input = (
  <editor>
    <hp>
      te
      <cursor />
      st
    </hp>
  </editor>
) as any as SlateEditor;

it('should be', () => {
  selectEndOfBlockAboveSelection(input);
  expect(input.selection?.anchor).toEqual({
    offset: 4,
    path: [0, 0],
  });
});
