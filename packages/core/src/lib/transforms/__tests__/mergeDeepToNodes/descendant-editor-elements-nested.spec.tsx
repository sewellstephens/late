/** @jsx jsx */

import { ListItemPlugin } from '@sewell_stephens/late-list';
import { jsx } from '@sewell_stephens/late-test-utils';
import { isDescendant } from '@sewell_stephens/slate';

import { ParagraphPlugin } from '../../../plugins';
import { mergeDeepToNodes } from '../../../utils';

jsx;

const node = (
  <editor>
    <hli>
      test
      <hp>test</hp>test
    </hli>
  </editor>
) as any;

const props = { a: 1 };

const output = (
  <editor>
    <element a={1} type={ListItemPlugin.key}>
      <htext a={1}>test</htext>
      <element a={1} type={ParagraphPlugin.key}>
        <htext a={1}>test</htext>
      </element>
      <htext a={1}>test</htext>
    </element>
  </editor>
) as any;

it('should set props to all descendants', () => {
  mergeDeepToNodes({
    node,
    query: {
      filter: ([n]) => isDescendant(n),
    },
    source: props,
  });
  expect(node.children).toEqual(output.children);
});
