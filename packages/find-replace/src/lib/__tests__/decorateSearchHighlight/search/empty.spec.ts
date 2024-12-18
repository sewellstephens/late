import type { Range } from 'slate';

import { getEditorPlugin } from '@sewell_stephens/late-common';
import { createSlateEditor } from '@sewell_stephens/late-common';

import { FindReplacePlugin } from '../../../FindReplacePlugin';
import { decorateFindReplace } from '../../../decorateFindReplace';

const output: Range[] = [];

it('should be', () => {
  const editor = createSlateEditor({
    plugins: [FindReplacePlugin.configure({ options: { search: '' } })],
  });

  expect(
    decorateFindReplace({
      ...getEditorPlugin(editor, FindReplacePlugin),
      entry: [{ text: '' }, [0, 0]],
    })
  ).toEqual(output);
});
