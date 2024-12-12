/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-common';

import { createPlateEditor } from '@sewellstephens/plate-common/react';
import { IndentPlugin } from '@sewellstephens/plate-indent';
import { jsx } from '@sewellstephens/plate-test-utils';

import { IndentListPlugin } from '../IndentListPlugin';

jsx;

describe('normalizeIndentList', () => {
  describe('when listStyleType without indent', () => {
    it('should remove listStyleType and listStart props', async () => {
      const input = (
        <editor>
          <hp listStart={1} listStyleType="disc">
            1
          </hp>
        </editor>
      ) as any as SlateEditor;

      const output = (
        <editor>
          <hp>1</hp>
        </editor>
      ) as any as SlateEditor;

      const editor = createPlateEditor({
        editor: input,
        plugins: [IndentListPlugin, IndentPlugin],
        shouldNormalizeEditor: true,
      });

      expect(editor.children).toEqual(output.children);
    });
  });
});
