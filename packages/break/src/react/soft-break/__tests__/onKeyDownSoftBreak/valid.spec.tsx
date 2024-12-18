/** @jsx jsx */

import {
  createLateEditor,
  getEditorPlugin,
} from '@sewellstephens/plate-common/react';
import * as isHotkey from '@sewellstephens/plate-core';
import { jsx } from '@sewellstephens/plate-test-utils';

import { SoftBreakPlugin } from '../../SoftBreakPlugin';
import { onKeyDownSoftBreak } from '../../onKeyDownSoftBreak';

jsx;

const input = (
  <editor>
    <hp>
      test
      <cursor />
    </hp>
  </editor>
) as any;

const event = new KeyboardEvent('keydown') as any;

const output = (
  <editor>
    <hp>
      test{'\n'}
      <cursor />
    </hp>
  </editor>
) as any;

it('should be', () => {
  jest.spyOn(isHotkey, 'isHotkey').mockReturnValue(true);
  onKeyDownSoftBreak({
    ...getEditorPlugin(
      createLateEditor({ editor: input }),
      SoftBreakPlugin.configure({
        options: { rules: [{ hotkey: 'shift+enter' }] },
      })
    ),
    event: event as any,
  });
  expect(input.children).toEqual(output.children);
});
