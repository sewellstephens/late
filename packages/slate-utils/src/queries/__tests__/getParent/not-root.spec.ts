import { createTEditor, getParentNode } from '@sewell_stephens/slate';

it('should be', () => {
  expect(getParentNode(createTEditor(), [0])?.[1]).toEqual([]);
});
