/** @jsx jsx */

import type { SlateEditor } from '@sewell_stephens/late-common';

import { ParagraphPlugin } from '@sewell_stephens/late-common';
import { createLateEditor } from '@sewell_stephens/late-common/react';
import { createDataTransfer, jsx } from '@sewell_stephens/late-test-utils';

import { CodeBlockPlugin } from '../react/CodeBlockPlugin';

jsx;

const editorTest = (input: any, data: DataTransfer, expected: any) => {
  const plugins = [ParagraphPlugin, CodeBlockPlugin];

  const editor = createLateEditor({
    editor: input,
    plugins,
  });

  editor.insertData(data);

  expect(editor.children).toEqual(expected.children);
};

describe('when pasting text into a code block', () => {
  it('should paste only the fragment', () => {
    const input = (
      <editor>
        <hcodeblock>
          <hcodeline>
            <htext />
            <cursor />
          </hcodeline>
        </hcodeblock>
      </editor>
    ) as any as SlateEditor;

    const fragment = createDataTransfer(
      new Map([
        [
          'text/html',
          '<html><head><meta http-equiv="content-type" content="text/html; charset=UTF-8"></head><body><pre style="background-color:#212121;color:#eeffff;font-family:\'MonoLisa 600 normal\',monospace;font-size:9.8pt;"><span style="color:#c792ea;font-style:italic;">const&#32;</span><span style="color:#a9b7c6;">a&#32;</span><span style="color:#89ddff;">=&#32;</span><span style="color:#c3e88d;">\'b\'</span><span style="color:#89ddff;">;<br></span><span style="color:#c792ea;font-style:italic;">const&#32;</span><span style="color:#a9b7c6;">c&#32;</span><span style="color:#89ddff;">=&#32;</span><span style="color:#c3e88d;">\'d\'</span><span style="color:#89ddff;">;</span></pre></body></html>',
        ],
        ['text/plain', 'const a = "b";\nconst c = "d";'],
      ])
    );

    const expected = (
      <editor>
        <hcodeblock>
          <hcodeline>const a = "b";</hcodeline>
          <hcodeline>const c = "d";</hcodeline>
        </hcodeblock>
      </editor>
    ) as any as SlateEditor;

    editorTest(input, fragment, expected);
  });
});
