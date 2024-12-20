/** @jsx jsx */

import { BlockquotePlugin } from '@sewell_stephens/late-block-quote';
import { jsx } from '@sewell_stephens/late-test-utils';

import type { SlateEditor } from '../../../editor';

import { createLateEditor } from '../../../../react';

jsx;

const input = (
  <editor>
    <hp>
      test
      <cursor />
    </hp>
  </editor>
) as any as SlateEditor;

const output = (
  <editor>
    <hblockquote>
      test
      <cursor />
    </hblockquote>
  </editor>
) as any;

it('should be', () => {
  const editor = createLateEditor({ editor: input });
  editor.tf.toggle.block({ type: BlockquotePlugin.key });

  expect(editor.children).toEqual(output.children);
});
