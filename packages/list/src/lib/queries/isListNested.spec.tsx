/** @jsx jsx */

import { findNode } from '@sewell_stephens/late-common';
import { createLateEditor } from '@sewell_stephens/late-common/react';
import { jsx } from '@sewell_stephens/late-test-utils';

import { isListNested } from './isListNested';

jsx;

describe('when the list is nested', () => {
  const input = (
    <editor>
      <hul id="1">
        <hli id="2">
          <hp>2</hp>
          <hul id="21">
            <hli>
              <hp>21</hp>
            </hli>
            <hli>
              <hp>
                22
                <cursor />
              </hp>
            </hli>
          </hul>
        </hli>
      </hul>
    </editor>
  ) as any;

  it('should be', () => {
    const editor = createLateEditor({ editor: input });

    const list = findNode(editor, { match: { id: '21' } });

    expect(isListNested(editor, list?.[1] as any)).toBeTruthy();
  });
});

describe('when the list is not nested', () => {
  const input = (
    <editor>
      <hul id="1">
        <hli id="2">
          <hp>2</hp>
        </hli>
      </hul>
    </editor>
  ) as any;

  it('should be', () => {
    const editor = createLateEditor({ editor: input });

    const list = findNode(editor, { match: { id: '1' } });

    expect(isListNested(editor, list?.[1] as any)).toBeFalsy();
  });
});
