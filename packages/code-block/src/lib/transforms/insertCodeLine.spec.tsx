/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-common';

import { createLateEditor } from '@sewellstephens/plate-common/react';
import { jsx } from '@sewellstephens/plate-test-utils';

import { CodeBlockPlugin } from '../../react/CodeBlockPlugin';
import { insertCodeLine } from './insertCodeLine';

jsx;

describe('insert code line', () => {
  it('should insert code line below selected line', () => {
    const input = (
      <editor>
        <hcodeblock>
          <hcodeline>
            line 1<cursor />
          </hcodeline>
          <hcodeline>line 2</hcodeline>
        </hcodeblock>
      </editor>
    ) as any as SlateEditor;

    const output = (
      <editor>
        <hcodeblock>
          <hcodeline>line 1</hcodeline>
          <hcodeline>
            {'    '}
            <cursor />
          </hcodeline>
          <hcodeline>line 2</hcodeline>
        </hcodeblock>
      </editor>
    ) as any as SlateEditor;

    const editor = createLateEditor({
      editor: input,
      plugins: [CodeBlockPlugin],
    });

    insertCodeLine(editor, 4);

    expect(input.children).toEqual(output.children);
  });
});
