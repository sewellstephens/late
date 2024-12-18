/** @jsx jsx */

import { type SlateEditor, getNode } from '@sewell_stephens/late-common';
import { createLateEditor } from '@sewell_stephens/late-common/react';
import { jsx } from '@sewell_stephens/late-test-utils';

import { CodeBlockPlugin } from '../../react/CodeBlockPlugin';

jsx;

describe('clean up code block', () => {
  it('should turn children of code block to code lines', () => {
    const input = (
      <editor>
        <hcodeblock>
          <hp>line 1</hp>
          <hcodeline>line 2</hcodeline>
        </hcodeblock>
      </editor>
    ) as any as SlateEditor;

    const output = (
      <editor>
        <hcodeblock>
          <hcodeline>line 1</hcodeline>
          <hcodeline>line 2</hcodeline>
        </hcodeblock>
      </editor>
    ) as any as SlateEditor;

    const editor = createLateEditor({
      editor: input,
      plugins: [CodeBlockPlugin],
    });

    const path = [0];
    const node = getNode(editor, path);

    editor.normalizeNode([node!, path]);

    expect(input.children).toEqual(output.children);
  });
});
