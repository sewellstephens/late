import React from 'react';

import type { AnyEditorLatePlugin } from '../plugin/LatePlugin';

import { getEditorPlugin } from '../plugin';
import { useEditorRef, useLateActions, useLateSelectors } from '../stores';

export function EditorRefPluginEffect({
  id,
  plugin,
}: {
  id?: string;
  plugin: AnyEditorLatePlugin;
}) {
  const editor = useEditorRef(id);

  plugin.useHooks?.(getEditorPlugin(editor, plugin) as any);

  return null;
}

export function EditorRefEffect({ id }: { id?: string }) {
  const editor = useLateSelectors(id).editor();
  const setIsMounted = useLateActions(id).isMounted();

  React.useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, [setIsMounted]);

  return (
    <>
      {editor.pluginList.map((plugin) => (
        <EditorRefPluginEffect id={id} key={plugin.key} plugin={plugin} />
      ))}
    </>
  );
}
