/** @jsx jsx */

import { jsx } from '@sewellstephens/plate-test-utils';

import { ParagraphPlugin, createLateEditor } from '../../../../react';
import { htmlBodyToFragment } from './htmlBodyToFragment';
import { parseHtmlElement } from './parseHtmlElement';

jsx;

describe('when element is a body', () => {
  it('should be a fragment with the children', () => {
    const output = (
      <fragment>
        <hp>
          <htext>test</htext>
        </hp>
      </fragment>
    );

    const body = document.createElement('body');
    body.append(parseHtmlElement(`<p>test</p>`));

    expect(
      htmlBodyToFragment(
        createLateEditor({ plugins: [ParagraphPlugin] }),
        body
      )
    ).toEqual(output);
  });
});

describe('when element is not a body', () => {
  const output = undefined;

  it('should be undefined', () => {
    expect(
      htmlBodyToFragment(
        createLateEditor(),
        parseHtmlElement(`<div>test</div>`)
      )
    ).toEqual(output);
  });
});
