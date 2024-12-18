/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-common';

import { createLateEditor } from '@sewellstephens/plate-common/react';
import { jsx } from '@sewellstephens/plate-test-utils';

import { isSelectionAtCodeBlockStart } from './isSelectionAtCodeBlockStart';

jsx;

describe('isSelectionAtCodeBlockStart', () => {
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

    expect(
      isSelectionAtCodeBlockStart(createLateEditor({ editor: input }))
    ).toBe(false);
  });

  it('should be false when on a non-first line of a code block', () => {
    const input = (
      <editor>
        <hcodeblock>
          <hcodeline>
            <htext />
          </hcodeline>
          <hcodeline>
            <htext />
            <cursor />
          </hcodeline>
        </hcodeblock>
      </editor>
    ) as any as SlateEditor;

    expect(
      isSelectionAtCodeBlockStart(createLateEditor({ editor: input }))
    ).toBe(false);
  });

  it('should be false when not at the start of a code line', () => {
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

    expect(
      isSelectionAtCodeBlockStart(createLateEditor({ editor: input }))
    ).toBe(false);
  });

  it('should be true when at the start of the first line of a code block', () => {
    const input = (
      <editor>
        <hcodeblock>
          <hcodeline>
            <cursor />
            line 1
          </hcodeline>
          <hcodeline>line 2</hcodeline>
        </hcodeblock>
      </editor>
    ) as any as SlateEditor;

    expect(
      isSelectionAtCodeBlockStart(createLateEditor({ editor: input }))
    ).toBe(true);
  });
});
