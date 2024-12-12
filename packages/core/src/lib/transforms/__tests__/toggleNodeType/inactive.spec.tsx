/** @jsx jsx */

import { BlockquotePlugin } from '@sewellstephens/plate-block-quote';
import { jsx } from '@sewellstephens/plate-test-utils';

import type { SlateEditor } from '../../../editor';

import { createPlateEditor } from '../../../../react';

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
  const editor = createPlateEditor({ editor: input });
  editor.tf.toggle.block({ type: BlockquotePlugin.key });

  expect(editor.children).toEqual(output.children);
});
