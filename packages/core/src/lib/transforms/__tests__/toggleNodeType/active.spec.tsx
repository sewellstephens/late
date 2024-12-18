/** @jsx jsx */

import { jsx } from '@sewell_stephens/late-test-utils';

import type { SlateEditor } from '../../../editor';

import { createLateEditor } from '../../../../react';

jsx;

const input = (
  <editor>
    <hblockquote>
      test
      <cursor />
    </hblockquote>
  </editor>
) as any as SlateEditor;

const output = (
  <editor>
    <hdefault>
      test
      <cursor />
    </hdefault>
  </editor>
) as any;

it('should be', () => {
  const editor = createLateEditor({ editor: input });
  editor.tf.toggle.block({ type: 'blockquote' });

  expect(editor.children).toEqual(output.children);
});
