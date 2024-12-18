/** @jsx jsx */

import { jsx } from '@sewell_stephens/late-test-utils';
import { isElement } from '@sewell_stephens/slate';

import { mergeDeepToNodes } from '../../../utils';

jsx;

const node = (<htext>test</htext>) as any;

const props = { a: 1 };

const output = (<htext>test</htext>) as any;

it('should do nothing', () => {
  mergeDeepToNodes({
    node,
    query: {
      filter: ([n]) => isElement(n),
    },
    source: props,
  });
  expect(node).toEqual(output);
});
