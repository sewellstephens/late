/** @jsx jsx */

import { jsx } from '@sewell_stephens/late-test-utils';
import { selectEndOfBlockAboveSelection } from '@sewell_stephens/slate-utils';

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
