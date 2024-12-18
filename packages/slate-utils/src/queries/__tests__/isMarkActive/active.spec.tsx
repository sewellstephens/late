/** @jsx jsx */

import { jsx } from '@sewell_stephens/late-test-utils';

import { isMarkActive } from '../../isMarkActive';

jsx;

const input = (
  <editor>
    <hp>
      tes
      <htext bold>t</htext>
      <cursor />
    </hp>
  </editor>
) as any;

it('should be', () => {
  expect(isMarkActive(input, 'bold')).toEqual(true);
});
