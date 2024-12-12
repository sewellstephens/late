import React, { useEffect } from 'react';

import { useHotkeys } from '@sewellstephens/react-hotkeys';
import { isDefined } from '@sewellstephens/utils';

import type { Shortcut } from '../plugin';

import { useEditorRef } from '../stores';

export function EditorHotkeysEffect({
  editableRef,
  id,
}: {
  editableRef: React.RefObject<HTMLDivElement>;
  id?: string;
}) {
  const editor = useEditorRef(id);

  return (
    <>
      {Object.entries(editor.shortcuts).map(([hotkeyString, hotkeyConfig]) => {
        if (
          !hotkeyConfig ||
          !isDefined(hotkeyConfig.keys) ||
          !hotkeyConfig.handler
        ) {
          return null;
        }

        return (
          <HotkeyEffect
            editableRef={editableRef}
            hotkeyConfig={hotkeyConfig}
            id={id}
            key={hotkeyString}
          />
        );
      })}
    </>
  );
}

function HotkeyEffect({
  editableRef,
  hotkeyConfig,
  id,
}: {
  editableRef: React.RefObject<HTMLDivElement>;
  hotkeyConfig: Shortcut;
  id?: string;
}) {
  const editor = useEditorRef(id);
  const { handler, keys, ...options } = hotkeyConfig;

  const setHotkeyRef = useHotkeys<HTMLDivElement>(
    keys!,
    (event, eventDetails) => {
      handler!({
        editor,
        event,
        eventDetails,
      });
    },
    {
      enableOnContentEditable: true,
      ...options,
    },
    []
  );

  useEffect(() => {
    if (editableRef.current) {
      setHotkeyRef(editableRef.current);
    }
  }, [setHotkeyRef, editableRef]);

  return null;
}
