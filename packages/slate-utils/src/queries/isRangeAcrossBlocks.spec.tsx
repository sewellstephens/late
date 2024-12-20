/** @jsx jsx */

import type { TEditor } from '@sewell_stephens/slate';

import { jsx } from '@sewell_stephens/late-test-utils';

import { isRangeAcrossBlocks } from './isRangeAcrossBlocks';

jsx;

describe('when selection is in the same block', () => {
  describe('when one text', () => {
    it('should be false', () => {
      const input = (
        <editor>
          <hp>
            Secundus, <anchor />
            velox lubas superbe anhelare <focus />
            de noster , lotus acipenser.
          </hp>
        </editor>
      ) as any as TEditor;

      expect(isRangeAcrossBlocks(input)).toEqual(false);
    });
  });

  describe('when focus is inline element', () => {
    it('should be false', () => {
      const input = (
        <editor>
          <hp>
            Secundus, <anchor />
            velox lubas superbe{' '}
            <ha>
              anhelare <focus />
              de noster
            </ha>
            , lotus acipenser.
          </hp>
        </editor>
      ) as any as TEditor;

      input.isInline = (element) => element.type === 'a';

      expect(isRangeAcrossBlocks(input)).toEqual(false);
    });
  });
});
