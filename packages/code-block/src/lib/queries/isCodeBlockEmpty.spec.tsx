/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-common';

import { createLateEditor } from '@sewellstephens/plate-common/react';
import { jsx } from '@sewellstephens/plate-test-utils';

import { isCodeBlockEmpty } from './isCodeBlockEmpty';

jsx;

describe('isCodeBlockEmpty', () => {
  it('should be false when not in a code block', () => {
    const input = (
      <editor>
        <hp>
          <htext />
          <cursor />
        </hp>
        <hcodeblock>
          <hcodeline>
            <htext />
          </hcodeline>
        </hcodeblock>
      </editor>
    ) as any as SlateEditor;

    expect(isCodeBlockEmpty(createLateEditor({ editor: input }))).toBe(false);
  });

  it('should be false when in a code block with multiple lines', () => {
    const input = (
      <editor>
        <hcodeblock>
          <hcodeline>
            <htext />
            <cursor />
          </hcodeline>
          <hcodeline>
            <htext />
          </hcodeline>
        </hcodeblock>
      </editor>
    ) as any as SlateEditor;

    expect(isCodeBlockEmpty(createLateEditor({ editor: input }))).toBe(false);
  });

  it('should be false when in a non-empty code line', () => {
    const input = (
      <editor>
        <hcodeblock>
          <hcodeline>
            test
            <cursor />
          </hcodeline>
        </hcodeblock>
      </editor>
    ) as any as SlateEditor;

    expect(isCodeBlockEmpty(createLateEditor({ editor: input }))).toBe(false);
  });

  it('should be true when in an empty code line', () => {
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

    expect(isCodeBlockEmpty(createLateEditor({ editor: input }))).toBe(true);
  });
});
