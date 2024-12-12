/** @jsx jsx */

import { CodeBlockPlugin } from '@sewellstephens/plate-code-block';
import {
  createPlateEditor,
  getEditorPlugin,
} from '@sewellstephens/plate-common/react';
import * as isHotkey from '@sewellstephens/plate-core';
import { jsx } from '@sewellstephens/plate-test-utils';

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
      createPlateEditor({ editor: input }),
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
