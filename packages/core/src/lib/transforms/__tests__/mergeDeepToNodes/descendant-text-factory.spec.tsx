/** @jsx jsx */

import { jsx } from '@sewellstephens/plate-test-utils';
import { isDescendant } from '@sewellstephens/slate';

import { mergeDeepToNodes } from '../../../utils';

jsx;

const node = (<htext>test</htext>) as any;

const props = { a: 1 };

const output = (<htext a={1}>test</htext>) as any;

it('should set props to the text node using a factory', () => {
  mergeDeepToNodes({
    node,
    query: { filter: ([n]) => isDescendant(n) },
    source: () => props,
  });
  expect(node).toEqual(output);
});
