/** @jsx jsx */

import { type SlateEditor, normalizeEditor } from '@sewell_stephens/late-common';
import { createSlateEditor } from '@sewell_stephens/late-common';
import { jsx } from '@sewell_stephens/late-test-utils';

import { SUGGESTION_KEYS } from './SuggestionPlugin';
import { SuggestionPlugin } from './SuggestionPlugin';

jsx;

describe('withSuggestion', () => {
  describe('insertText', () => {
    describe('when editor.getOptions(SuggestionPlugin).isSuggesting is not defined', () => {
      it('should not add marks', () => {
        const input = (
          <editor>
            <hp>
              test
              <cursor />
            </hp>
          </editor>
        ) as any as SlateEditor;

        const output = (
          <editor>
            <hp>
              testtest
              <cursor />
            </hp>
          </editor>
        ) as any as SlateEditor;

        const editor = createSlateEditor({
          editor: input,
          plugins: [SuggestionPlugin],
        });
        editor.setOption(SuggestionPlugin, 'isSuggesting', false);

        editor.insertText('test');

        expect(editor.children).toEqual(output.children);
      });
    });

    describe('when editor.getOptions(SuggestionPlugin).isSuggesting is defined', () => {
      describe('when cursor is not in suggestion mark', () => {
        it('should add marks', () => {
          const input = (
            <editor>
              <hp>
                test
                <cursor />
              </hp>
            </editor>
          ) as any as SlateEditor;

          // const output = ((
          //   <editor>
          //     <hp>
          //       test<htext suggestion>test</htext>
          //       <cursor />
          //     </hp>
          //   </editor>
          // ) as any) as SlateEditor;

          const editor = createSlateEditor({
            editor: input,
            plugins: [SuggestionPlugin],
          });
          editor.setOption(SuggestionPlugin, 'isSuggesting', true);

          editor.insertText('test');

          expect(
            editor.children[0].children[1][SuggestionPlugin.key]
          ).toBeTruthy();
          expect(
            editor.children[0].children[1][SUGGESTION_KEYS.id]
          ).toBeTruthy();
        });
      });

      // describe('when cursor is in suggestion mark', () => {
      //   it('should not add a new suggestion id', () => {
      //     const input = ((
      //       <editor>
      //         <hp>
      //           <htext suggestion suggestionId="1">
      //             test
      //             <cursor />
      //           </htext>
      //         </hp>
      //       </editor>
      //     ) as any) as SlateEditor;
      //
      //     const output = ((
      //       <editor>
      //         <hp>
      //           <htext suggestion suggestionId="1">
      //             testtest
      //             <cursor />
      //           </htext>
      //         </hp>
      //       </editor>
      //     ) as any) as SlateEditor;
      //
      //     const editor = createSlateEditor({
      //       editor: input,
      //       plugins: [SuggestionPlugin],
      //     });
      //     editor.getOptions(SuggestionPlugin).isSuggesting = true;
      //
      //     editor.insertText('test');
      //
      //     expect(editor.children).toEqual(output.children);
      //   });
      // });
    });
  });

  describe('deleteBackward', () => {
    describe('when editor.getOptions(SuggestionPlugin).isSuggesting is not defined', () => {
      it('should not add marks', () => {
        const input = (
          <editor>
            <hp>
              test
              <cursor />
            </hp>
          </editor>
        ) as any as SlateEditor;

        const output = (
          <editor>
            <hp>
              tes
              <cursor />
            </hp>
          </editor>
        ) as any as SlateEditor;

        const editor = createSlateEditor({
          editor: input,
          plugins: [SuggestionPlugin],
        });
        editor.setOption(SuggestionPlugin, 'isSuggesting', false);

        editor.deleteBackward('character');

        expect(editor.children).toEqual(output.children);
      });
    });

    describe('when editor.getOptions(SuggestionPlugin).isSuggesting is true', () => {
      describe('when there is no point before', () => {
        it('should not add a new suggestion id', () => {
          const input = (
            <editor>
              <hp>
                <htext suggestion suggestionId="1">
                  <cursor />
                  test
                </htext>
              </hp>
            </editor>
          ) as any as SlateEditor;

          const output = (
            <editor>
              <hp>
                <htext suggestion suggestionId="1">
                  <cursor />
                  test
                </htext>
              </hp>
            </editor>
          ) as any as SlateEditor;

          const editor = createSlateEditor({
            editor: input,
            plugins: [SuggestionPlugin],
          });
          editor.setOption(SuggestionPlugin, 'isSuggesting', true);

          editor.deleteBackward('character');

          expect(editor.children).toEqual(output.children);
        });
      });

      describe('when point before is not marked', () => {
        it('should add a new suggestion id', () => {
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
            plugins: [SuggestionPlugin],
          });
          editor.setOption(SuggestionPlugin, 'isSuggesting', true);

          editor.deleteBackward('character');

          expect(
            editor.children[0].children[1][SuggestionPlugin.key]
          ).toBeTruthy();
          expect(
            editor.children[0].children[1].suggestionDeletion
          ).toBeTruthy();
          expect(
            editor.children[0].children[1][SUGGESTION_KEYS.id]
          ).toBeTruthy();
          expect(editor.children[0].children[0].text).toBe('tes');
        });
      });

      describe('when point before is marked', () => {
        it('should add a new suggestion id', () => {
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
            plugins: [SuggestionPlugin],
          });
          editor.setOption(SuggestionPlugin, 'isSuggesting', true);

          editor.deleteBackward('character');

          expect(
            editor.children[0].children[1][SuggestionPlugin.key]
          ).toBeTruthy();
          expect(
            editor.children[0].children[1].suggestionDeletion
          ).toBeTruthy();
          expect(
            editor.children[0].children[1][SUGGESTION_KEYS.id]
          ).toBeTruthy();
          expect(editor.children[0].children[0].text).toBe('tes');
        });
      });

      describe('when delete line', () => {
        it('should add a new suggestion id', () => {
          const input = (
            <editor>
              <hp>
                test
                <cursor />
              </hp>
            </editor>
          ) as any as SlateEditor;

          // const output = ((
          //   <editor>
          //     <hp>
          //       tes
          //       <htext suggestion suggestionId="1" suggestionDeletion>
          //         t
          //       </htext>
          //     </hp>
          //   </editor>
          // ) as any) as SlateEditor;

          const editor = createSlateEditor({
            editor: input,
            plugins: [SuggestionPlugin],
          });
          editor.setOption(SuggestionPlugin, 'isSuggesting', true);

          editor.deleteBackward('line');

          expect(
            editor.children[0].children[0][SuggestionPlugin.key]
          ).toBeTruthy();
          expect(
            editor.children[0].children[0].suggestionDeletion
          ).toBeTruthy();
          expect(
            editor.children[0].children[0][SUGGESTION_KEYS.id]
          ).toBeTruthy();
        });
      });
    });
  });

  describe('normalizeNode', () => {
    describe('when there is a suggestion mark without id', () => {
      it('should remove mark', () => {
        const input = (
          <editor>
            <hp>
              <htext suggestion>
                test
                <cursor />
              </htext>
            </hp>
          </editor>
        ) as any as SlateEditor;

        const output = (
          <editor>
            <hp>
              test
              <cursor />
            </hp>
          </editor>
        ) as any as SlateEditor;

        const editor = createSlateEditor({
          editor: input,
          plugins: [SuggestionPlugin],
        });

        normalizeEditor(editor, {
          force: true,
        });

        expect(editor.children).toEqual(output.children);
      });
    });
  });
});
