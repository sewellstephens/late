import type { JSHandle } from '@playwright/test';
import type { getNode } from '@sewell_stephens/late-common';
import type { LateEditor, toDOMNode } from '@sewell_stephens/late-common/react';

export interface TLatePlaywrightAdapter {
  EDITABLE_TO_EDITOR: WeakMap<HTMLElement, LateEditor>;
  getNode: typeof getNode;
  toDOMNode: typeof toDOMNode;
}

export type EditorHandle<E extends LateEditor = LateEditor> = JSHandle<E>;
