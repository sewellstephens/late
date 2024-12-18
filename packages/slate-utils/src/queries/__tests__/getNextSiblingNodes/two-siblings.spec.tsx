/** @jsx jsx */

import type { Range } from 'slate';

import { type SlateEditor, getBlockAbove } from '@sewell_stephens/late-common';
import { createLateEditor } from '@sewell_stephens/late-common/react';
import { LinkPlugin } from '@sewell_stephens/late-link';
import { jsx } from '@sewell_stephens/late-test-utils';

import { getNextSiblingNodes } from '../../getNextSiblingNodes';

jsx;

const input = (
  <editor>
    <hp>
      <htext>first</htext>
      <ha>
        test
        <cursor />
      </ha>
      <htext />
      <htext>last</htext>
    </hp>
  </editor>
) as any as SlateEditor;

const output = [<htext />, <htext>last</htext>];

it('should be', () => {
  const editor = createLateEditor({
    editor: input,
    plugins: [LinkPlugin],
  });

  const above = getBlockAbove(editor) as any;

  expect(
    getNextSiblingNodes(above, (input.selection as Range).anchor.path)
  ).toEqual(output);
});
