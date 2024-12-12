/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-common';
import type { TDescendant } from '@sewellstephens/slate';
import type { Range } from 'slate';

import { createPlateEditor } from '@sewellstephens/plate-common/react';
import { LinkPlugin } from '@sewellstephens/plate-link';
import { jsx } from '@sewellstephens/plate-test-utils';

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
  const editor = createPlateEditor({
    editor: input,
    plugins: [LinkPlugin],
  });

  const above = getBlockAbove(editor) as any;
  expect(
    getNextSiblingNodes(above, (input.selection as Range).anchor.path)
  ).toEqual(output);
});
