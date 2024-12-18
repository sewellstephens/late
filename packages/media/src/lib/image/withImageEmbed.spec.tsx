/** @jsx jsx */

import { getEditorPlugin } from '@sewell_stephens/late-common';
import { createSlateEditor } from '@sewell_stephens/late-common';
import { jsx } from '@sewell_stephens/late-test-utils';

import { ImagePlugin } from './ImagePlugin';
import { withImageEmbed } from './withImageEmbed';

jsx;

describe('withImageEmbed', () => {
  const input = (
    <editor>
      <hp>test</hp>
    </editor>
  ) as any;

  const output = (
    <editor>
      <hp>test</hp>
      <himg url="https://i.imgur.com/removed.png">
        <htext />
      </himg>
    </editor>
  ) as any;

  it('should insert image from the text', () => {
    const editor = withImageEmbed(
      getEditorPlugin(createSlateEditor({ editor: input }), ImagePlugin)
    );

    const data = {
      getData: () => 'https://i.imgur.com/removed.png',
    };
    editor.insertData(data as any);

    expect(input.children).toEqual(output.children);
  });
});
