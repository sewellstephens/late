/** @jsx jsx */

import { createLateEditor } from '@sewellstephens/plate-common/react';
import { jsx } from '@sewellstephens/plate-test-utils';

import { getListRoot } from './getListRoot';

jsx;

const listRoot = (
  <hul>
    <hli id="2">
      <hp>2</hp>
      <hul>
        <hli>
          <hp>21</hp>
        </hli>
        <hli>
          <hp>
            22
            <cursor />
          </hp>
        </hli>
      </hul>
    </hli>
  </hul>
) as any;

const input = (<editor>{listRoot}</editor>) as any;

it('should be', () => {
  const sublist = getListRoot(createLateEditor({ editor: input }));

  expect(sublist).toEqual([listRoot, [0]]);
});
