/** @jsx jsx */

import { CodeBlockPlugin } from '@sewellstephens/plate-code-block';
import { jsx } from '@sewellstephens/plate-test-utils';
import { toggleWrapNodes } from '@sewellstephens/slate-utils';

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
