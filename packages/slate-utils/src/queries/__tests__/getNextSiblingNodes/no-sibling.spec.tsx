/** @jsx jsx */

import type { SlateEditor } from '@sewell_stephens/late-common';
import type { TDescendant } from '@sewell_stephens/slate';
import type { Range } from 'slate';

import { createLateEditor } from '@sewell_stephens/late-common/react';
import { LinkPlugin } from '@sewell_stephens/late-link';
import { jsx } from '@sewell_stephens/late-test-utils';

import { getBlockAbove } from '../../getBlockAbove';
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
    </hp>
  </editor>
) as any as SlateEditor;

const output: TDescendant[] = [];

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
