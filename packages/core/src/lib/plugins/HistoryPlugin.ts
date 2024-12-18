import { withHistory } from 'slate-history';

import type { SlateEditor } from '../editor';

import { type ExtendEditor, createSlatePlugin } from '../plugin';

export const withLateHistory: ExtendEditor = ({ editor }) =>
  withHistory(editor as any) as any as SlateEditor;

/** @see {@link withHistory} */
export const HistoryPlugin = createSlatePlugin({
  extendEditor: withLateHistory,
  key: 'history',
});
