/** @jsx jsx */

import { getHtmlDocument, jsx } from '@sewellstephens/plate-test-utils';

import { createLateEditor } from '../../../../react';
import { deserializeHtmlNode } from './deserializeHtmlNode';

jsx;

describe('when element has a br', () => {
  const editor = createLateEditor({ plugins: [] });

  const html = `<html><body>test<br /></body></html>`;
  const element = getHtmlDocument(html).body;

  const output = (
    <editor>
      <htext>test{'\n'}</htext>
    </editor>
  ) as any;

  it('should have the break line', () => {
    expect(deserializeHtmlNode(editor)(element)).toEqual(output.children);
  });
});
