/** @jsx jsx */

import { CodeBlockPlugin } from '@sewell_stephens/late-code-block';
import {
  createLateEditor,
  getEditorPlugin,
} from '@sewell_stephens/late-common/react';
import * as isHotkey from '@sewell_stephens/late-core';
import { jsx } from '@sewell_stephens/late-test-utils';

import { SoftBreakPlugin } from '../../SoftBreakPlugin';
import { onKeyDownSoftBreak } from '../../onKeyDownSoftBreak';

jsx;

const input = (
  <editor>
    <hp>paragraph</hp>
    <hcodeblock>
      code
      <cursor />
      block
    </hcodeblock>
  </editor>
) as any;

const event = new KeyboardEvent('keydown') as any;

const output = (
  <editor>
    <hp>paragraph</hp>
    <hcodeblock>code{'\n'}block</hcodeblock>
  </editor>
) as any;

it('should be', () => {
  jest.spyOn(isHotkey, 'isHotkey').mockReturnValue(true);
  onKeyDownSoftBreak({
    ...getEditorPlugin(
      createLateEditor({ editor: input }),
      SoftBreakPlugin.configure({
        options: {
          rules: [{ hotkey: 'enter', query: { allow: [CodeBlockPlugin.key] } }],
        },
      })
    ),
    event: event as any,
  });
  expect(input.children).toEqual(output.children);
});
