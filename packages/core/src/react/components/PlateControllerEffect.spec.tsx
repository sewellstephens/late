import React from 'react';

import { act, render, renderHook } from '@testing-library/react';
import { useFocused } from 'slate-react';

import { createLateEditor } from '../editor';
import { LateController, useLateControllerSelectors } from '../stores';
import { Late } from './Late';
import { LateControllerEffect } from './LateControllerEffect';

const DebugLateController = () => {
  const editorStores = useLateControllerSelectors().editorStores();
  const activeId = useLateControllerSelectors().activeId();
  const primaryEditorIds = useLateControllerSelectors().primaryEditorIds();

  return (
    <div>
      {Object.entries(editorStores).map(([id, editorStore]) => (
        <p key={id}>
          {id}: {editorStore ? 'non-null' : 'null'}
        </p>
      ))}
      <p>activeId: {activeId ?? 'null'}</p>
      {primaryEditorIds.map((id) => (
        <p key={id}>primaryEditorId: {id}</p>
      ))}
    </div>
  );
};

const UnmountableLate = ({
  children,
  initialMounted = true,
}: {
  children: React.ReactNode;
  initialMounted?: boolean;
}) => {
  const [mounted, setMounted] = React.useState(initialMounted);

  return (
    <div>
      <button onClick={() => setMounted(!mounted)} type="button">
        {mounted ? 'unmountLate' : 'mountLate'}
      </button>
      {mounted && children}
    </div>
  );
};

const FocusedContext = React.createContext(false);

jest.mock('slate-react', () => ({
  ...jest.requireActual('slate-react'),
  useFocused: () => React.useContext(FocusedContext),
}));

const ControlledFocusedContext = ({
  children,
  initialFocused = false,
}: {
  children: React.ReactNode;
  initialFocused?: boolean;
}) => {
  const [focused, setFocused] = React.useState(initialFocused);

  return (
    <FocusedContext.Provider value={focused}>
      <button onClick={() => setFocused(!focused)} type="button">
        {focused ? 'unfocus' : 'focus'}
      </button>
      {children}
    </FocusedContext.Provider>
  );
};

describe('ControlledFocusedContext', () => {
  it('sets useFocused to false', () => {
    const { result } = renderHook(() => useFocused(), {
      wrapper: ({ children }) => (
        <ControlledFocusedContext initialFocused={false}>
          {children}
        </ControlledFocusedContext>
      ),
    });

    expect(result.current).toBe(false);
  });

  it('sets useFocused to true', () => {
    const { result } = renderHook(() => useFocused(), {
      wrapper: ({ children }) => (
        <ControlledFocusedContext initialFocused={true}>
          {children}
        </ControlledFocusedContext>
      ),
    });

    expect(result.current).toBe(true);
  });
});

describe('LateControllerEffect', () => {
  describe('when LateController exists', () => {
    describe('when a non-primary editor mounts and unmounts', () => {
      const editor = createLateEditor({
        id: 'test',
      });

      const children = (
        <LateController>
          <UnmountableLate>
            <Late editor={editor} primary={false}>
              <LateControllerEffect />
            </Late>
          </UnmountableLate>
          <DebugLateController />
        </LateController>
      );

      it('registers and unregisters the store', () => {
        const { getByText } = render(children);
        expect(getByText('test: non-null')).toBeInTheDocument();
        act(() => getByText('unmountLate').click());
        expect(getByText('test: null')).toBeInTheDocument();
        act(() => getByText('mountLate').click());
        expect(getByText('test: non-null')).toBeInTheDocument();
      });

      it('does not affect primaryEditorIds', () => {
        const { queryByText } = render(children);
        expect(queryByText('primaryEditorId: test')).not.toBeInTheDocument();
      });
    });

    describe('when the editor is focused', () => {
      it('becomes active', () => {
        const editor = createLateEditor({
          id: 'test',
        });

        const { getByText } = render(
          <LateController>
            <Late editor={editor}>
              <ControlledFocusedContext>
                <LateControllerEffect />
              </ControlledFocusedContext>
            </Late>
            <DebugLateController />
          </LateController>
        );

        expect(getByText('activeId: null')).toBeInTheDocument();
        act(() => getByText('focus').click());
        expect(getByText('activeId: test')).toBeInTheDocument();
      });
    });
  });

  describe('when a primary editor mounts and unmounts', () => {
    it('appends and removes the id from primaryEditorIds', () => {
      const { getByText, queryByText } = render(
        <LateController primaryEditorIds={['1', '2']}>
          <UnmountableLate initialMounted={false}>
            <Late editor={createLateEditor({ id: '3' })} primary={true}>
              <LateControllerEffect />
            </Late>
          </UnmountableLate>
          <DebugLateController />
        </LateController>
      );

      expect(queryByText('primaryEditorId: 1')).toBeInTheDocument();
      expect(queryByText('primaryEditorId: 2')).toBeInTheDocument();
      expect(queryByText('primaryEditorId: 3')).not.toBeInTheDocument();
      act(() => getByText('mountLate').click());
      expect(queryByText('primaryEditorId: 1')).toBeInTheDocument();
      expect(queryByText('primaryEditorId: 2')).toBeInTheDocument();
      expect(queryByText('primaryEditorId: 3')).toBeInTheDocument();
      act(() => getByText('unmountLate').click());
      expect(queryByText('primaryEditorId: 1')).toBeInTheDocument();
      expect(queryByText('primaryEditorId: 2')).toBeInTheDocument();
      expect(queryByText('primaryEditorId: 3')).not.toBeInTheDocument();
    });
  });

  describe('when LateController does not exist', () => {
    it('does not throw an error', () => {
      const { getByText } = render(
        <Late editor={createLateEditor()}>
          <LateControllerEffect />
          <p>No error</p>
        </Late>
      );

      expect(getByText('No error')).toBeInTheDocument();
    });
  });
});
