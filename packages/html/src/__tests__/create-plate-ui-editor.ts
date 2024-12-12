import type { AnyPluginConfig, Value } from '@sewellstephens/plate-common';

import {
  type CreatePlateEditorOptions,
  type PlateCorePlugin,
  createPlateEditor,
} from '@sewellstephens/plate-common/react';
import { createPlateUI } from 'www/src/lib/plate/create-plate-ui';

/** Create a plate editor with default UI. */
export const createPlateUIEditor = <
  V extends Value = Value,
  P extends AnyPluginConfig = PlateCorePlugin,
>({ override, ...options }: CreatePlateEditorOptions<V, P> = {}) =>
  createPlateEditor<V, P>({
    ...options,
    override: {
      components: createPlateUI(override?.components),
    },
  });
