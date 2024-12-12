import { createTEditor, getParentNode } from '@sewellstephens/slate';

it('should be', () => {
  expect(getParentNode(createTEditor(), [0])?.[1]).toEqual([]);
});
