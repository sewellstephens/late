/** @jsx jsx */

import {
  createPlateEditor,
  getEditorPlugin,
} from '@sewellstephens/plate-common/react';
import { jsx } from '@sewellstephens/plate-test-utils';

import { ExitBreakPlugin } from '../../ExitBreakPlugin';
import { onKeyDownExitBreak } from '../../onKeyDownExitBreak';

jsx;

const input = (
  <editor>
    <hp>
      test
      <cursor />
    </hp>
  </editor>
) as any;

const event = new KeyboardEvent('keydown') as any;

const output = (
  <editor>
    <hp>
      test
      <cursor />
    </hp>
  </editor>
) as any;

it('should be', () => {
  onKeyDownExitBreak({
    ...getEditorPlugin(createPlateEditor({ editor: input }), ExitBreakPlugin),
    event,
  });
  expect(input.children).toEqual(output.children);
});
