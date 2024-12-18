/** @jsx jsx */

import { ParagraphPlugin } from '@sewellstephens/plate-common';
import { getEditorPlugin } from '@sewellstephens/plate-common/react';
import { createLateEditor } from '@sewellstephens/plate-common/react';
import * as isHotkey from '@sewellstephens/plate-core';
import { IndentPlugin } from '@sewellstephens/plate-indent';
import { jsx } from '@sewellstephens/plate-test-utils';

import { IndentListPlugin } from './IndentListPlugin';
import { onKeyDownIndentList } from './onKeyDownIndentList';

jsx;

jest.spyOn(isHotkey, 'isHotkey').mockReturnValue(true);

describe('when indented list and empty', () => {
  it('should outdent', () => {
    const input = (
      <editor>
        <hp indent={2} listStyleType="disc">
          <cursor />
        </hp>
      </editor>
    ) as any;

    const output = (
      <editor>
        <hp indent={1} listStyleType="disc">
          <htext />
        </hp>
      </editor>
    ) as any;

    const event = new KeyboardEvent('keydown', { key: 'Enter' }) as any;
    const editor = createLateEditor({
      editor: input,
      plugins: [ParagraphPlugin, IndentPlugin, IndentListPlugin],
    });

    onKeyDownIndentList({
      ...getEditorPlugin(editor, IndentListPlugin),
      event: event as any,
    });

    expect(editor.children).toEqual(output.children);

    // const output2 = (
    //   <editor>
    //     <hp>
    //       <htext />
    //     </hp>
    //   </editor>
    // ) as any;
    //
    // onKeyDownIndentList({
    //   editor,
    //   event: event as any,
    //   plugin: getPlugin<IndentListPluginOptions>(editor, IndentListPlugin.key),
    // });
    //
    // expect(editor.children).toEqual(output2.children);
  });
});

describe('when indented and empty but not list', () => {
  it('should do nothing', () => {
    const input = (
      <editor>
        <hp indent={2}>
          <cursor />
        </hp>
      </editor>
    ) as any;

    const output = (
      <editor>
        <hp indent={2}>
          <htext />
        </hp>
      </editor>
    ) as any;

    const event = new KeyboardEvent('keydown', { key: 'Enter' }) as any;
    const editor = createLateEditor({
      editor: input,
      plugins: [ParagraphPlugin, IndentPlugin, IndentListPlugin],
    });

    onKeyDownIndentList({
      ...getEditorPlugin(editor, IndentListPlugin),
      event: event as any,
    });

    expect(editor.children).toEqual(output.children);
  });
});
