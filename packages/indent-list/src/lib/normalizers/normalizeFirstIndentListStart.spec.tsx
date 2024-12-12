/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-common';

import { ParagraphPlugin } from '@sewellstephens/plate-common';
import { createPlateEditor } from '@sewellstephens/plate-common/react';
import { IndentPlugin } from '@sewellstephens/plate-indent';
import { jsx } from '@sewellstephens/plate-test-utils';

import { IndentListPlugin } from '../IndentListPlugin';

jsx;

const input = (
  <editor>
    <hp>1</hp>
    <hp indent={1} listStart={1} listStyleType="disc">
      2
    </hp>
  </editor>
) as any as SlateEditor;

const output = (
  <editor>
    <hp>1</hp>
    <hp indent={1} listStyleType="disc">
      2
    </hp>
  </editor>
) as any as SlateEditor;

it('should be', async () => {
  const editor = createPlateEditor({
    editor: input,
    plugins: [ParagraphPlugin, IndentPlugin, IndentListPlugin],
    shouldNormalizeEditor: true,
  });

  expect(editor.children).toEqual(output.children);
});
