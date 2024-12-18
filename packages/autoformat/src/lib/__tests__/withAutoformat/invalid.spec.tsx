/** @jsx jsx */

import { createSlateEditor } from '@sewell_stephens/late-common';
import { jsx } from '@sewell_stephens/late-test-utils';
import { getAutoformatOptions } from 'www/src/lib/plate/demo/plugins/autoformatOptions';

import { AutoformatPlugin } from '../../AutoformatPlugin';

jsx;

describe('when the start match is not present and the end match is present', () => {
  it('should run default', () => {
    const input = (
      <fragment>
        <hp>
          hello*
          <cursor />
        </hp>
      </fragment>
    ) as any;

    const output = (
      <fragment>
        <hp>hello* </hp>
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

describe('when there is a character before match', () => {
  it('should run default', () => {
    const input = (
      <fragment>
        <hp>
          a**hello
          <cursor />
        </hp>
      </fragment>
    ) as any;

    const output = (
      <fragment>
        <hp>a**hello**</hp>
      </fragment>
    ) as any;

    const editor = createSlateEditor({
      plugins: [
        AutoformatPlugin.configure({ options: getAutoformatOptions() }),
      ],
      value: input,
    });

    editor.insertText('*');
    editor.insertText('*');

    expect(input.children).toEqual(output.children);
  });
});

describe('when there is a character before match', () => {
  it('should run default', () => {
    const input = (
      <fragment>
        <hp>
          a**hello
          <cursor />
        </hp>
      </fragment>
    ) as any;

    const output = (
      <fragment>
        <hp>a**hello**</hp>
      </fragment>
    ) as any;

    const editor = createSlateEditor({
      plugins: [
        AutoformatPlugin.configure({ options: getAutoformatOptions() }),
      ],
      value: input,
    });

    editor.insertText('*');
    editor.insertText('*');

    expect(input.children).toEqual(output.children);
  });
});

describe('when selection is null', () => {
  it('should run insertText', () => {
    const input = (
      <fragment>
        <hp>**hello**</hp>
      </fragment>
    ) as any;

    const output = (
      <fragment>
        <hp>**hello**</hp>
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
