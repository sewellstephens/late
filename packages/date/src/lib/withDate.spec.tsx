/** @jsx jsx */

import type { LateEditor } from '@sewell_stephens/late-common/react';

import { jsx } from '@sewell_stephens/late-test-utils';

import { createLateTestEditor } from '../../../core/src/react/__tests__/createLateTestEditor';
import { DatePlugin } from './DatePlugin';

jsx;

describe('On keydown', () => {
  it('inline date should not be selected on keydown arrow right', async () => {
    const input = (
      <editor>
        <hp>
          <htext>test</htext>
          <cursor />
          <hdate date="2024-01-01">
            <htext />
          </hdate>
          <htext>test</htext>
        </hp>
      </editor>
    ) as any as LateEditor;

    const output = (
      <editor>
        <hp>
          <htext>test</htext>
          <hdate date="2024-01-01">
            <htext />
          </hdate>
          <cursor />
          <htext>test</htext>
        </hp>
      </editor>
    ) as any as LateEditor;

    const [editor, { triggerKeyboardEvent }] = await createLateTestEditor({
      editor: input,
      plugins: [DatePlugin],
    });

    await triggerKeyboardEvent('ArrowRight');

    expect(editor.selection).toEqual(output.selection);
  });

  it('inline date should not be selected on keydown arrow left', async () => {
    const input = (
      <editor>
        <hp>
          <htext>test</htext>
          <hdate date="2024-01-01">
            <htext />
          </hdate>
          <cursor />
          <htext>test</htext>
        </hp>
      </editor>
    ) as any as LateEditor;

    const output = (
      <editor>
        <hp>
          <htext>test</htext>
          <cursor />
          <hdate date="2024-01-01">
            <htext />
          </hdate>
          <htext>test</htext>
        </hp>
      </editor>
    ) as any as LateEditor;

    const [editor, { triggerKeyboardEvent }] = await createLateTestEditor({
      editor: input,
      plugins: [DatePlugin],
    });

    await triggerKeyboardEvent('ArrowLeft');

    expect(editor.selection).toEqual(output.selection);
  });

  it('inline date should not be selected When two inline dates are adjacent', async () => {
    const input = (
      <editor>
        <hp>
          <htext>test</htext>
          <cursor />
          <hdate date="2024-01-01">
            <htext />
          </hdate>
          <htext />
          <hdate date="2024-01-01">
            <htext />
          </hdate>
          <htext>test</htext>
        </hp>
      </editor>
    ) as any as LateEditor;

    const output = (
      <editor>
        <hp>
          <htext>test</htext>
          <hdate date="2024-01-01">
            <htext />
          </hdate>
          <cursor />
          <htext />
          <hdate date="2024-01-01">
            <htext />
          </hdate>
          <htext />
          <htext>test</htext>
        </hp>
      </editor>
    ) as any as LateEditor;

    const [editor, { triggerKeyboardEvent }] = await createLateTestEditor({
      editor: input,
      plugins: [DatePlugin],
    });

    await triggerKeyboardEvent('ArrowRight');

    expect(editor.selection).toEqual(output.selection);
  });
});
