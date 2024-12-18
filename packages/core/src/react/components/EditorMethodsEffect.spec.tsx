import React from 'react';

import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';

import { createLateEditor } from '../editor';
import { useLateStore } from '../stores';
import { Late } from './Late';
import { LateContent } from './LateContent';

describe('EditorMethodsEffect and redecorate', () => {
  it('should set redecorate method on editor', () => {
    const editor = createLateEditor();

    const wrapper = () => (
      <Late editor={editor}>
        <LateContent />
      </Late>
    );

    renderHook(() => null, { wrapper });

    expect(editor.api.redecorate).toBeDefined();
  });

  // it('should trigger decorate when redecorate is called', () => {
  //   const decorate = jest.fn(() => []);
  //   const plugins = [createSlatePlugin({ decorate, key: 'test' })];
  //   const editor = createLateEditor({ plugins });
  //
  //   const wrapper = () => (
  //     <Late decorate={decorate} editor={editor}>
  //       <LateContent />
  //     </Late>
  //   );
  //
  //   const { result } = renderHook(() => useRedecorate(), { wrapper });
  //
  //   act(() => {
  //     result.current();
  //   });
  //
  //   expect(decorate).toHaveBeenCalled();
  // });

  // it('should increment versionDecorate when redecorate is called', () => {
  //   const editor = createLateEditor();
  //
  //   const wrapper = () => (
  //     <Late editor={editor}>
  //       <LateContent />
  //     </Late>
  //   );
  //
  //   const { result: redecorateFn } = renderHook(() => useRedecorate(), {
  //     wrapper,
  //   });
  //   const { result: selectorsResult } = renderHook(() => useLateSelectors(), {
  //     wrapper,
  //   });
  //
  //   const initialVersion = selectorsResult.current.versionDecorate();
  //
  //   act(() => {
  //     redecorateFn.current();
  //   });
  //
  //   expect(selectorsResult.current.versionDecorate()).toBe(initialVersion + 1);
  // });

  it('should set setLateState on editor', () => {
    const editor = createLateEditor();

    const wrapper = () => (
      <Late editor={editor}>
        <LateContent />
      </Late>
    );

    renderHook(() => null, { wrapper });

    expect(editor.setLateState).toBeDefined();
  });

  it('should set setLateState on editor', () => {
    const editor = createLateEditor();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Late editor={editor}>
        <LateContent />
        {children}
      </Late>
    );

    renderHook(() => null, { wrapper });

    expect(editor.setLateState).toBeDefined();
  });

  it('should update allowed keys using setLateState', () => {
    const editor = createLateEditor();

    const TestComponent = () => {
      const readOnly = useLateStore().get.readOnly();

      return <div data-testid="readOnly">{readOnly ? 'true' : 'false'}</div>;
    };

    const { getByTestId } = render(
      <Late editor={editor}>
        <LateContent />
        <TestComponent />
      </Late>
    );

    act(() => {
      editor.setLateState('readOnly', true);
    });

    expect(getByTestId('readOnly')).toHaveTextContent('true');
  });
});
