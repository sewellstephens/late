import React from 'react';

import { render } from '@testing-library/react';

import { createSlatePlugin } from '../../lib';
import { Late, LateContent } from '../components';
import { createLateEditor } from '../editor';

describe('useEditableProps', () => {
  describe('default', () => {
    it('should trigger decorate only once', () => {
      const decorate = jest.fn();

      const editor = createLateEditor({
        plugins: [
          createSlatePlugin({
            decorate: () => {
              decorate();

              return [];
            },
            key: 'a',
          }),
        ],
      });

      render(
        <Late editor={editor}>
          <LateContent />
        </Late>
      );

      expect(decorate).toHaveBeenCalledTimes(3);
    });
  });

  // describe('redecorate', () => {
  //   it('should trigger decorate twice', () => {
  //     const decorate = jest.fn();
  //
  //     const plugins: LatePluginList = [
  //       {
  //         key: 'a',
  //         decorate: () => {
  //           decorate();
  //           return [];
  //         },
  //       },
  //     ];
  //
  //     const A = () => {
  //       useEditableProps()
  //
  //       return null
  //     }
  //
  //     const wrapper = ({ children }: any) => (
  //       <Late plugins={plugins}><A />{children}</Late>
  //     );
  //
  //     const { result } = renderHook(() => useEditorValue(), {
  //       wrapper,
  //     });
  //
  //     render(<Late plugins={plugins} />);
  //
  //     act(() => {
  //       getLateActions().redecorate();
  //     });
  //
  //     expect(decorate).toBeCalledTimes(6);
  //   });
  // });
});
