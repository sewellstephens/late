/** @jsx jsx */

import type { SlateEditor } from '@sewell_stephens/late-common';

import { createSlateEditor } from '@sewell_stephens/late-common';
import { jsx } from '@sewell_stephens/late-test-utils';

import { SUGGESTION_KEYS } from '../SuggestionPlugin';
import { SuggestionPlugin } from '../SuggestionPlugin';
import { addSuggestionMark } from './addSuggestionMark';

jsx;

describe('addSuggestionMark', () => {
  // describe('when editor.activeSuggestionId is defined', () => {
  //   it('should not add marks', () => {
  //     const input = ((
  //       <editor>
  //         <hp>
  //           test
  //           <cursor />
  //         </hp>
  //       </editor>
  //     ) as any) as SlateEditor;
  //
  //     const editor = createSlateEditor({
  //       editor: input,
  //     });
  //     editor.activeSuggestionId = 'active_suggestion_id';
  //
  //     addSuggestionMark(editor);
  //
  //     expect(editor.marks).toBeNull();
  //   });
  // });

  describe('when editor.activeSuggestionId is not defined', () => {
    describe('when editor.marks?.[SuggestionPlugin.key] is not defined', () => {
      it('should add marks', () => {
        const input = (
          <editor>
            <hp>
              test
              <cursor />
            </hp>
          </editor>
        ) as any as SlateEditor;

        const editor = createSlateEditor({
          editor: input,
        });

        addSuggestionMark(editor);
        expect(editor.marks?.[SuggestionPlugin.key]).toBeTruthy();
        expect(editor.marks?.[SUGGESTION_KEYS.id]).toBeTruthy();
      });
    });
  });
});
