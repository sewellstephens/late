/** @jsx jsx */

import { createSlateEditor } from '@sewellstephens/plate-common';
import { jsx } from '@sewellstephens/plate-test-utils';
import { getAutoformatOptions } from 'www/src/lib/plate/demo/plugins/autoformatOptions';

import { AutoformatPlugin } from '../../../AutoformatPlugin';

jsx;

const input = (
  <fragment>
    <hp>
      {'>'}
      <cursor />
      hello
    </hp>
  </fragment>
) as any;

const output = (
  <fragment>
    <hblockquote>hello</hblockquote>
  </fragment>
) as any;

it('should autoformat', () => {
  const editor = createSlateEditor({
    plugins: [AutoformatPlugin.configure({ options: getAutoformatOptions() })],
    value: input,
  });

  editor.insertText(' ');

  expect(input.children).toEqual(output.children);
});
