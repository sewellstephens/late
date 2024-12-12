import { createTEditor, getParentNode } from '@sewellstephens/slate';

it('should be', () => {
  expect(getParentNode(createTEditor(), [])).toEqual(undefined);
});
