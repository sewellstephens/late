/** @jsx jsx */

import type { SlateEditor } from '@sewell_stephens/late-common';

import { createLateEditor } from '@sewell_stephens/late-common/react';
import { jsx } from '@sewell_stephens/late-test-utils';

import { CodeBlockPlugin } from '../../react/CodeBlockPlugin';
import { unwrapCodeBlock } from './unwrapCodeBlock';

jsx;

describe('unwrap code block', () => {
  it('should turn a code block to multiple p', () => {
    const input = (
      <editor>
        <hcodeblock>
          <hcodeline>
            line 1
            <cursor />
          </hcodeline>

          <hcodeline>line 2</hcodeline>
        </hcodeblock>
      </editor>
    ) as any as SlateEditor;

    const output = (
      <editor>
        <hp>
          <htext>line 1</htext>
          <cursor />
        </hp>
        <hp>line 2</hp>
      </editor>
    ) as any as SlateEditor;

    const editor = createLateEditor({
      editor: input,
      plugins: [CodeBlockPlugin],
    });

    unwrapCodeBlock(editor);

    expect(input.children).toEqual(output.children);
  });

  it('should turn multiple code blocks to multiple p', () => {
    const input = (
      <editor>
        <hcodeblock>
          <hcodeline>line 1</hcodeline>
          <hcodeline>
            line 2
            <anchor />
          </hcodeline>
          <hcodeline>line 3</hcodeline>
        </hcodeblock>
        <hcodeblock>
          <hcodeline>
            line 4
            <focus />
          </hcodeline>
          <hcodeline>line 5</hcodeline>
        </hcodeblock>
      </editor>
    ) as any as SlateEditor;

    const output = (
      <editor>
        <hp>line 1</hp>
        <hp>
          line 2
          <anchor />
        </hp>
        <hp>line 3</hp>
        <hp>
          line 4
          <focus />
        </hp>
        <hp>line 5</hp>
      </editor>
    ) as any as SlateEditor;

    const editor = createLateEditor({
      editor: input,
      plugins: [CodeBlockPlugin],
    });

    unwrapCodeBlock(editor);

    expect(input.children).toEqual(output.children);
  });

  describe('when not inside code block', () => {
    it('should do nothing', () => {
      const input = (
        <editor>
          <hp>
            <htext>line 1</htext>
            <cursor />
          </hp>
          <hcodeblock>
            <hcodeline>line 2</hcodeline>

            <hcodeline>line 3</hcodeline>
          </hcodeblock>
        </editor>
      ) as any as SlateEditor;

      const output = (
        <editor>
          <hp>
            <htext>line 1</htext>
          </hp>
          <hcodeblock>
            <hcodeline>
              line 2
              <cursor />
            </hcodeline>

            <hcodeline>line 3</hcodeline>
          </hcodeblock>
        </editor>
      ) as any as SlateEditor;

      const editor = createLateEditor({
        editor: input,
        plugins: [CodeBlockPlugin],
      });

      unwrapCodeBlock(editor);

      expect(input.children).toEqual(output.children);
    });
  });
});
