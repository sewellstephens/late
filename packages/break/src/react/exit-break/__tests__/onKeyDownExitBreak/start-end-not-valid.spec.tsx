/** @jsx jsx */

import {
  createLateEditor,
  getEditorPlugin,
} from '@sewell_stephens/late-common/react';
import * as isHotkey from '@sewell_stephens/late-core';
import { jsx } from '@sewell_stephens/late-test-utils';

import { ExitBreakPlugin } from '../../ExitBreakPlugin';
import { onKeyDownExitBreak } from '../../onKeyDownExitBreak';

jsx;

const input = (
  <editor>
    <hp>
      te
      <cursor />
      st
    </hp>
  </editor>
) as any;

const event = new KeyboardEvent('keydown') as any;

const output = (
  <editor>
    <hp>
      <cursor />
      test
    </hp>
  </editor>
) as any;

it('should be', () => {
  jest.spyOn(isHotkey, 'isHotkey').mockReturnValue(true);
  onKeyDownExitBreak({
    ...getEditorPlugin(
      createLateEditor({ editor: input }),
      ExitBreakPlugin.configure({
        options: {
          rules: [
            {
              hotkey: 'enter',
              level: 0,
              query: { end: true, start: true },
            },
          ],
        },
      })
    ),
    editor: input,
    event,
  });
  expect(input.children).toEqual(output.children);
  expect(input.selection?.anchor).toEqual({ offset: 2, path: [0, 0] });
});
