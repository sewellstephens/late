import { createTEditor, getParentNode } from '@sewell_stephens/slate';

it('should be', () => {
  expect(getParentNode(createTEditor(), [])).toEqual(undefined);
});
