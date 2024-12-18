/** @jsx jsx */

import type { SlateEditor } from '@sewell_stephens/late-common';

import { ParagraphPlugin } from '@sewell_stephens/late-common';
import { createLateEditor } from '@sewell_stephens/late-common/react';
import { IndentPlugin } from '@sewell_stephens/late-indent';
import { jsx } from '@sewell_stephens/late-test-utils';

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
  const editor = createLateEditor({
    editor: input,
    plugins: [ParagraphPlugin, IndentPlugin, IndentListPlugin],
    shouldNormalizeEditor: true,
  });

  expect(editor.children).toEqual(output.children);
});
