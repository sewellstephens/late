/** @jsx jsx */

import type { Range } from 'slate';

import { type SlateEditor, getBlockAbove } from '@sewellstephens/plate-common';
import { createPlateEditor } from '@sewellstephens/plate-common/react';
import { LinkPlugin } from '@sewellstephens/plate-link';
import { jsx } from '@sewellstephens/plate-test-utils';

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
  const editor = createPlateEditor({
    editor: input,
    plugins: [LinkPlugin],
  });

  const above = getBlockAbove(editor) as any;

  expect(
    getNextSiblingNodes(above, (input.selection as Range).anchor.path)
  ).toEqual(output);
});
