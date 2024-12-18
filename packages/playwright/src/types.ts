import type { JSHandle } from '@playwright/test';
import type { getNode } from '@sewellstephens/plate-common';
import type { LateEditor, toDOMNode } from '@sewellstephens/plate-common/react';

export interface TLatePlaywrightAdapter {
  EDITABLE_TO_EDITOR: WeakMap<HTMLElement, LateEditor>;
  getNode: typeof getNode;
  toDOMNode: typeof toDOMNode;
}

export type EditorHandle<E extends LateEditor = LateEditor> = JSHandle<E>;
