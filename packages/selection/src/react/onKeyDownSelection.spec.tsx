/** @jsx jsx */

import { jsx } from '@sewell_stephens/late-test-utils';

jsx;

// FIXME
describe('onKeyDownSelection', () => {
  it('todo', () => {
    expect(true).toBe(true);
  });

  // it('should select all when cmd+a is pressed and selection covers block', async () => {
  //   const input = (
  //     <editor>
  //       <hp id="1">
  //         <cursor />
  //         <htext>test</htext>
  //       </hp>
  //     </editor>
  //   ) as any;
  //
  //   const output = (
  //     <editor>
  //       <hp id="1">
  //         <anchor />
  //         <htext>test</htext>
  //         <focus />
  //       </hp>
  //     </editor>
  //   ) as any;
  //
  //   const [editor, { triggerKeyboardEvent }] = await createLateTestEditor({
  //     editor: input,
  //     plugins: [BlockSelectionPlugin],
  //   });
  //
  //   await triggerKeyboardEvent('mod+a');
  //
  //   expect(editor.selection).toEqual(output.selection);
  // });
  //
  // it('should select all when cmd+a is pressed and selection is not in same block', async () => {
  //   const input = (
  //     <editor>
  //       <hp>
  //         te
  //         <anchor />
  //         st
  //       </hp>
  //       <hp>
  //         te
  //         <focus />
  //         st
  //       </hp>
  //     </editor>
  //   ) as any;
  //
  //   const [editor, { triggerKeyboardEvent }] = await createLateTestEditor({
  //     editor: input,
  //     plugins: [BlockSelectionPlugin],
  //   });
  //
  //   jest.spyOn(editor.api.blockSelection, 'selectedAll');
  //
  //   await triggerKeyboardEvent('mod+a');
  //
  //   expect(editor.api.blockSelection.selectedAll).toHaveBeenCalled();
  // });
});
