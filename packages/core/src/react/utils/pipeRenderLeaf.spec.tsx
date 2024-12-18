import React from 'react';

import { render } from '@testing-library/react';

import { createLateEditor } from '../editor/withLate';
import { pipeRenderLeaf } from './pipeRenderLeaf';

const attributes = {
  'data-slate-leaf': true,
  'data-testid': 'Leaf',
} as any;

const text = { text: 'test' };

it('should render the default leaf', () => {
  const Leaf = pipeRenderLeaf(createLateEditor({ plugins: [] }))!;

  const { getByTestId } = render(
    <Leaf attributes={attributes} leaf={text} text={text}>
      text
    </Leaf>
  );

  expect(getByTestId('Leaf')).toHaveAttribute('data-slate-leaf', 'true');
});
