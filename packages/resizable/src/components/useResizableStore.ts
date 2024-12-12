import type React from 'react';

import { createAtomStore } from '@sewellstephens/plate-common/react';

export const { ResizableProvider, resizableStore, useResizableStore } =
  createAtomStore(
    {
      width: 0 as React.CSSProperties['width'],
    },
    { name: 'resizable' }
  );
