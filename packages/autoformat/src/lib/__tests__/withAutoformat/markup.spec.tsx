/** @jsx jsx */

import {
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
} from '@sewellstephens/plate-basic-marks';
import { createSlateEditor } from '@sewellstephens/plate-common';
import { jsx } from '@sewellstephens/plate-test-utils';

import { AutoformatPlugin } from '../../AutoformatPlugin';

jsx;

describe('when match is an array', () => {
  it('should autoformat', () => {
    const input = (
      <fragment>
        <hp>
          _***hello***
          <cursor />
        </hp>
      </fragment>
    ) as any;

    const output = (
      <fragment>
        <hp>
          <htext bold italic underline>
            hello
          </htext>
        </hp>
      </fragment>
    ) as any;

    const editor = createSlateEditor({
      plugins: [
        AutoformatPlugin.configure({
          options: {
            rules: [
              {
                ignoreTrim: true,
                match: ['_***', '***_'],
                mode: 'mark',
                type: [UnderlinePlugin.key, BoldPlugin.key, ItalicPlugin.key],
              },
            ],
          },
        }),
      ],
      value: input,
    });

    editor.insertText('_');

    expect(input.children).toEqual(output.children);
  });
});

describe('when match is a string', () => {
  it('should autoformat', () => {
    const input = (
      <fragment>
        <hp>
          _***hello***
          <cursor />
        </hp>
      </fragment>
    ) as any;

    const output = (
      <fragment>
        <hp>
          <htext bold italic underline>
            hello
          </htext>
        </hp>
      </fragment>
    ) as any;

    const editor = createSlateEditor({
      plugins: [
        AutoformatPlugin.configure({
          options: {
            rules: [
              {
                ignoreTrim: true,
                match: '_***',
                mode: 'mark',
                type: [UnderlinePlugin.key, BoldPlugin.key, ItalicPlugin.key],
              },
            ],
          },
        }),
      ],
      value: input,
    });

    editor.insertText('_');

    expect(input.children).toEqual(output.children);
  });
});
