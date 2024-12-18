import type { TEditor } from '@sewell_stephens/slate';

import { ReactEditor } from 'slate-react';

/** Blur the editor. */
export const blurEditor = (editor: TEditor) => ReactEditor.blur(editor as any);
