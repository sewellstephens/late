/** @jsx jsx */

import { createSlateEditor } from '@sewell_stephens/late-common';
import { HEADING_KEYS } from '@sewell_stephens/late-heading';
import { jsx } from '@sewell_stephens/late-test-utils';
import {
  getAutoformatOptions,
  preFormat,
} from 'www/src/lib/plate/demo/plugins/autoformatOptions';

import { AutoformatPlugin } from '../../../AutoformatPlugin';

jsx;

describe('when #space', () => {
  it('should set block type to h1', () => {
    const input = (
      <fragment>
        <hp>
          #
          <cursor />
          hello
        </hp>
      </fragment>
    ) as any;

    const output = (
      <fragment>
        <hh1>hello</hh1>
      </fragment>
    ) as any;

    const editor = createSlateEditor({
      plugins: [
        AutoformatPlugin.configure({
          options: {
            rules: [
              {
                match: '# ',
                mode: 'block',
                preFormat: preFormat,
                type: HEADING_KEYS.h1,
              },
            ],
          },
        }),
      ],
      value: input,
    });

    editor.insertText(' ');

    expect(input.children).toEqual(output.children);
  });
});

describe('when ##space', () => {
  it('should set block type to h2', () => {
    const input = (
      <fragment>
        <hp>
          ##
          <cursor />
          hello
        </hp>
      </fragment>
    ) as any;

    const output = (
      <fragment>
        <hh2>hello</hh2>
      </fragment>
    ) as any;

    const editor = createSlateEditor({
      plugins: [
        AutoformatPlugin.configure({ options: getAutoformatOptions() }),
      ],
      value: input,
    });

    editor.insertText(' ');

    expect(input.children).toEqual(output.children);
  });
});
