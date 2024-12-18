/* eslint-disable react-hooks/rules-of-hooks */
/** @jsx jsx */

import { BoldPlugin, ItalicPlugin } from '@sewellstephens/plate-basic-marks';
import { ListPlugin } from '@sewellstephens/plate-list';
import { jsx } from '@sewellstephens/plate-test-utils';

import { createLateEditor } from '../../../../react';
import { createSlatePlugin } from '../../../plugin';
import { ParagraphPlugin } from '../../paragraph';
import { htmlElementToLeaf } from './htmlElementToLeaf';
import { parseHtmlElement } from './parseHtmlElement';

jsx;

describe('when children is a text', () => {
  const output = (
    <fragment>
      <htext bold>test</htext>
    </fragment>
  );

  it('should set the mark on the text', () => {
    expect(
      htmlElementToLeaf(
        createLateEditor({
          plugins: [BoldPlugin],
        }),
        parseHtmlElement(`<strong>test</strong>`)
      )
    ).toEqual(output);
  });
});

describe('when there is no plugins', () => {
  const output = [{ text: 'test' }];

  it('should do nothing', () => {
    expect(
      htmlElementToLeaf(
        createLateEditor({
          plugins: [createSlatePlugin({ key: 'a' })],
        }),
        parseHtmlElement(`<strong>test</strong>`)
      )
    ).toEqual(output);
  });
});

describe('when there is a mark above multiple elements', () => {
  const output = (
    <fragment>
      <hli>
        <hp>
          <htext bold>test</htext>
        </hp>
        <htext bold>test</htext>
      </hli>
    </fragment>
  );

  it('should set the mark to all children leaves', () => {
    expect(
      htmlElementToLeaf(
        createLateEditor({
          plugins: [ParagraphPlugin, ListPlugin, BoldPlugin, ItalicPlugin],
        }),
        parseHtmlElement(`<strong><li><p>test</p>test</li></strong>`)
      )
    ).toEqual(output);
  });
});
