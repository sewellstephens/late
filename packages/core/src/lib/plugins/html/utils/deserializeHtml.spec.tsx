/** @jsx jsx */

import { AlignPlugin } from '@sewell_stephens/late-alignment';
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from '@sewell_stephens/late-basic-marks';
import { BlockquotePlugin } from '@sewell_stephens/late-block-quote';
import { SoftBreakPlugin } from '@sewell_stephens/late-break';
import { CodeBlockPlugin } from '@sewell_stephens/late-code-block/react';
import { FindReplacePlugin } from '@sewell_stephens/late-find-replace';
import { HeadingPlugin } from '@sewell_stephens/late-heading';
import { HighlightPlugin } from '@sewell_stephens/late-highlight';
import { KbdPlugin } from '@sewell_stephens/late-kbd';
import { LinkPlugin } from '@sewell_stephens/late-link';
import { ListPlugin } from '@sewell_stephens/late-list';
import { ImagePlugin, MediaEmbedPlugin } from '@sewell_stephens/late-media';
import { TablePlugin } from '@sewell_stephens/late-table';
import { getHtmlDocument, jsx } from '@sewell_stephens/late-test-utils';

import { createLateEditor } from '../../../../react';
import { ParagraphPlugin } from '../../paragraph';
import { deserializeHtml } from './deserializeHtml';
import { deserializeHtmlElement } from './deserializeHtmlElement';

jsx;

describe('type', () => {});

describe('when collapseWhitespace is false', () => {
  const html = '<blockquote>test \n code</blockquote>';
  const element = getHtmlDocument(html).body.innerHTML;

  const expectedOutput = [{ text: 'test \n code' }];

  it('should have the break line', () => {
    const convertedDocumentFragment = deserializeHtml(createLateEditor(), {
      collapseWhiteSpace: false,
      element,
    });

    expect(convertedDocumentFragment).toEqual(expectedOutput);
  });
});

describe('when element is a div', () => {
  const html = '<div>test</div>';
  const element = getHtmlDocument(html).body;

  const output = (
    <fragment>
      <htext>test</htext>
    </fragment>
  ) as any;

  it('should be a fragment of text', () => {
    expect(
      deserializeHtml(createLateEditor(), {
        element,
      })
    ).toEqual(output);
  });
});

describe('when element is 2 p', () => {
  const output = (
    <fragment>
      <hp>first</hp>
      <hp>second</hp>
    </fragment>
  ) as any;

  it('should be a fragment of 2 paragraph nodes', () => {
    expect(
      deserializeHtml(
        createLateEditor({
          plugins: [ParagraphPlugin],
        }),
        {
          element: '<p>first</p><p>second</p>',
        }
      )
    ).toEqual(output);
  });
});

describe('when html is a text without tags', () => {
  const html = 'test';
  const element = getHtmlDocument(html).body;

  const output = (
    <fragment>
      <htext>test</htext>
    </fragment>
  ) as any;

  it('should be a fragment of text', () => {
    expect(
      deserializeHtml(createLateEditor(), {
        element,
      })
    ).toEqual(output);
  });
});

describe('when deserializing all plugins', () => {
  const textTags = [
    '<span>span</span>',
    '<strong>strong</strong>',
    '<span style="font-weight: 600">style</span>',
    '<i>i</i>',
    '<em>em</em>',
    '<span style="font-style: italic">style</span>',
    '<u>u</u>',
    '<span style="text-decoration: underline">style</span>',
    '<del>del</del>',
    '<s>s</s>',
    '<span style="text-decoration: line-through">style</span>',
    '<code>code</code>',
    '<kbd>kbd</kbd>',
    '<sub>sub</sub>',
    '<sup>sup</sup>',
  ];

  const inlineTags = ['<a href="http://google.com">a</a>'];

  const elementTags = [
    `<pre><code><div>code 1</div><div>code 2</div></code></pre>`,
    '<ul><li><p>ul-li-p</p></li></ul>',
    '<ol><li><p>ol-li-p</p></li></ol>',
    '<img alt="" src="https://i.imgur.com/removed.png" />',
    '<table><tr><td>table</td></tr></table>',
    `<iframe src="https://player.vimeo.com/video/26689853" />`,
  ];

  const html = `<html><body><p>${textTags.join('')}</p><p>${inlineTags.join(
    ''
  )}</p>${elementTags.join('')}</body></html>`;

  const element = getHtmlDocument(html).body;

  const output = (
    <editor>
      <hp>
        <htext>span</htext>
        <htext bold>strong</htext>
        <htext bold>style</htext>
        <htext italic>i</htext>
        <htext italic>em</htext>
        <htext italic>style</htext>
        <htext underline>u</htext>
        <htext underline>style</htext>
        <htext strikethrough>del</htext>
        <htext strikethrough>s</htext>
        <htext strikethrough>style</htext>
        <htext code>code</htext>
        <htext kbd>kbd</htext>
        <htext subscript>sub</htext>
        <htext superscript>sup</htext>
      </hp>
      <hp>
        <ha target="_blank" url="http://google.com">
          a
        </ha>
      </hp>
      <hcodeblock>
        <hcodeline>code 1code 2</hcodeline>
      </hcodeblock>
      <hul>
        <hli>
          <hp>ul-li-p</hp>
        </hli>
      </hul>
      <hol>
        <hli>
          <hp>ol-li-p</hp>
        </hli>
      </hol>
      <himg url="https://i.imgur.com/removed.png">
        <htext />
      </himg>
      <htable>
        <htr>
          <htd>table</htd>
        </htr>
      </htable>
      <hmediaembed url="https://player.vimeo.com/video/26689853">
        {'</body></html>'}
      </hmediaembed>
    </editor>
  ) as any;

  it('should be', () => {
    expect(
      deserializeHtmlElement(
        createLateEditor({
          plugins: [
            BlockquotePlugin,
            HeadingPlugin.configure({ options: { levels: 1 } }),
            ImagePlugin,
            LinkPlugin,
            ListPlugin,
            ParagraphPlugin,
            CodeBlockPlugin,
            TablePlugin,
            MediaEmbedPlugin,
            FindReplacePlugin,
            SoftBreakPlugin,
            AlignPlugin,
            BoldPlugin,
            HighlightPlugin,
            CodePlugin,
            KbdPlugin,
            ItalicPlugin,
            StrikethroughPlugin,
            SubscriptPlugin,
            SuperscriptPlugin,
            UnderlinePlugin,
          ],
        }),
        element
      )
    ).toEqual(output.children);
  });
});
