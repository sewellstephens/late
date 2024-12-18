/** @jsx jsx */

import {
  createSlatePlugin,
  getEditorString,
  insertText,
  wrapNodes,
} from '@sewell_stephens/late-common';
import { createSlateEditor } from '@sewell_stephens/late-common';
import { LinkPlugin } from '@sewell_stephens/late-link';
import { jsx } from '@sewell_stephens/late-test-utils';

import type { AutoformatPluginOptions } from '../../../types';

jsx;

const input = (
  <fragment>
    <hp>
      [Example site](https://example.com
      <cursor />
    </hp>
  </fragment>
) as any;

const output = (
  <fragment>
    <hp>
      <ha url="https://example.com">Example site</ha>
    </hp>
  </fragment>
) as any;

it('autoformats a block with a single character trigger', () => {
  const linkEditor = createSlateEditor({
    plugins: [
      createSlatePlugin<string, AutoformatPluginOptions>({
        options: {
          rules: [
            {
              format: (editor) => {
                const linkInputRange = editor.selection!.focus.path;
                const linkInputText = getEditorString(editor, linkInputRange);
                const [, text, url] = /\[(.+)]\((.*)/.exec(linkInputText)!;
                insertText(editor, text, { at: linkInputRange });
                wrapNodes(
                  editor,
                  { children: [], type: LinkPlugin.key, url },
                  { at: linkInputRange }
                );
              },
              match: ')',
              mode: 'block',
              triggerAtBlockStart: false,
              type: LinkPlugin.key,
            },
          ],
        },
      }),
    ],
    value: input,
  });

  linkEditor.insertText(')');

  expect(input.children).toEqual(output.children);
});
