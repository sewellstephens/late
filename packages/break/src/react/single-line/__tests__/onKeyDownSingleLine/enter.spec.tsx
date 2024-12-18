/** @jsx jsx */

import { jsx } from '@sewell_stephens/late-test-utils';

import { onKeyDownSingleLine } from '../../onKeyDownSingleLine';

jsx;

const input = (
  <editor>
    <hp>
      test
      <cursor />
    </hp>
  </editor>
) as any;

const event = new KeyboardEvent('keydown', { key: 'Enter' }) as any;

const output = (
  <editor>
    <hp>
      test
      <cursor />
    </hp>
  </editor>
) as any;

it('should be', () => {
  onKeyDownSingleLine({ event } as any);
  expect(input.children).toEqual(output.children);
});
