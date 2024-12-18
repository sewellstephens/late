/** @jsx jsx */

import { CodeBlockPlugin } from '@sewell_stephens/late-code-block';
import { jsx } from '@sewell_stephens/late-test-utils';
import { toggleWrapNodes } from '@sewell_stephens/slate-utils';

jsx;

const input = (
  <editor>
    <hp>
      test
      <cursor />
    </hp>
  </editor>
) as any;

const output = (
  <editor>
    <hcodeblock>
      <hp>
        test
        <cursor />
      </hp>
    </hcodeblock>
  </editor>
) as any;

it('should be', () => {
  toggleWrapNodes(input, CodeBlockPlugin.key);

  expect(input.children).toEqual(output.children);
});
