import { CaptionPlugin } from '@sewell_stephens/late-caption/react';
import { htmlStringToDOMNode } from '@sewell_stephens/late-core';
import { LinkPlugin } from '@sewell_stephens/late-link/react';
import { ImagePlugin } from '@sewell_stephens/late-media';

import { serializeHtml } from '../../react/serializeHtml';
import { createLateUIEditor } from '../create-plate-ui-editor';

it('serialize link to html with attributes', () => {
  const plugins = [
    LinkPlugin.extend(() => ({
      node: {
        props: {
          rel: 'noopener nofollow',
          target: '_blank',
        },
      },
    })),
  ];

  expect(
    serializeHtml(
      createLateUIEditor({
        plugins,
      }),
      {
        nodes: [
          { text: 'Some paragraph of text with ' },
          {
            attributes: { rel: 'noopener nofollow' },
            children: [{ text: 'link' }],
            type: 'a',
            url: 'https://theuselessweb.com/',
          },
          { text: ' part.' },
        ],
      }
    )
  ).toBe(
    `Some paragraph of text with <a class="slate-a" href="https://theuselessweb.com/" rel="noopener nofollow" target="_blank">link</a> part.`
  );
});

it('serialize image with alt to html', () => {
  const plugins = [ImagePlugin, CaptionPlugin];

  const element = {
    attributes: { alt: 'Never gonna give you up' },
    children: [],
    type: 'img',
    url: 'https://i.kym-cdn.com/photos/images/original/001/358/546/3fa.jpg',
  };

  expect(
    htmlStringToDOMNode(
      serializeHtml(createLateUIEditor({ plugins }), {
        nodes: [element],
      })
    ).querySelectorAll('img')[0].outerHTML
  ).toEqual(
    '<img draggable="true" src="https://i.kym-cdn.com/photos/images/original/001/358/546/3fa.jpg" alt="Never gonna give you up">'
  );
});
