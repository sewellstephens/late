import { withReact } from 'slate-react';

import type { ExtendEditor } from '../../../lib';

export const withLateReact: ExtendEditor = ({ editor }) => {
  return withReact(editor as any);
};
