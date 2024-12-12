/** @jsx jsx */

import { BoldPlugin, ItalicPlugin } from '@sewellstephens/plate-basic-marks';
import { jsx } from '@sewellstephens/plate-test-utils';
import { toggleMark } from '@sewellstephens/slate-utils';

jsx;

const input = (
  <editor>
    <hp>
      <htext bold>test</htext>
    </hp>
    <selection>
      <anchor offset={0} path={[0, 0]} />
      <focus offset={4} path={[0, 0]} />
    </selection>
  </editor>
) as any;

const output = (
  <editor>
    <hp>
      <htext italic>test</htext>
      <cursor />
    </hp>
  </editor>
) as any;

it('should be', () => {
  toggleMark(input, { clear: BoldPlugin.key, key: ItalicPlugin.key });
  expect(input.children).toEqual(output.children);
});
