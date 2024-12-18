/** @jsx jsx */

import {
  createLateEditor,
  getEditorPlugin,
} from '@sewell_stephens/late-common/react';
import * as isHotkey from '@sewell_stephens/late-core';
import { HEADING_KEYS } from '@sewell_stephens/late-heading';
import { jsx } from '@sewell_stephens/late-test-utils';

import { ExitBreakPlugin } from '../../ExitBreakPlugin';
import { onKeyDownExitBreak } from '../../onKeyDownExitBreak';

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
    <hcodeblock>codeblock</hcodeblock>
  </editor>
) as any;

it('should be', () => {
  jest.spyOn(isHotkey, 'isHotkey').mockReturnValue(true);
  onKeyDownExitBreak({
    ...getEditorPlugin(
      createLateEditor({ editor: input }),
      ExitBreakPlugin.configure({
        options: {
          rules: [{ hotkey: 'enter', query: { allow: [HEADING_KEYS.h1] } }],
        },
      })
    ),
    event,
  });
  expect(input.children).toEqual(output.children);
});
