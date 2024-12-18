/** @jsx jsx */

import {
  createLateEditor,
  getEditorPlugin,
} from '@sewellstephens/plate-common/react';
import { jsx } from '@sewellstephens/plate-test-utils';

import { SoftBreakPlugin } from '../../SoftBreakPlugin';
import { onKeyDownSoftBreak } from '../../onKeyDownSoftBreak';

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
  const editor = createLateEditor({ editor: input });

  onKeyDownSoftBreak({
    ...getEditorPlugin(editor, SoftBreakPlugin),
    event,
  });
  expect(editor.children).toEqual(output.children);
});
