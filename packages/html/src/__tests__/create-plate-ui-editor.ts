import type { AnyPluginConfig, Value } from '@sewellstephens/plate-common';

import {
  type CreateLateEditorOptions,
  type LateCorePlugin,
  createLateEditor,
} from '@sewellstephens/plate-common/react';
import { createLateUI } from 'www/src/lib/plate/create-plate-ui';

/** Create a plate editor with default UI. */
export const createLateUIEditor = <
  V extends Value = Value,
  P extends AnyPluginConfig = LateCorePlugin,
>({ override, ...options }: CreateLateEditorOptions<V, P> = {}) =>
  createLateEditor<V, P>({
    ...options,
    override: {
      components: createLateUI(override?.components),
    },
  });
