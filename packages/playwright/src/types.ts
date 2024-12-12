import type { JSHandle } from '@playwright/test';
import type { getNode } from '@sewellstephens/plate-common';
import type { PlateEditor, toDOMNode } from '@sewellstephens/plate-common/react';

export interface TPlatePlaywrightAdapter {
  EDITABLE_TO_EDITOR: WeakMap<HTMLElement, PlateEditor>;
  getNode: typeof getNode;
  toDOMNode: typeof toDOMNode;
}

export type EditorHandle<E extends PlateEditor = PlateEditor> = JSHandle<E>;
