/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@sewell_stephens/late-test-utils';

import { excalidrawInitialData } from './excalidrawInitialData';

jsx;

export const excalidrawValue: any = (
  <fragment>
    <hh2>Excalidraw</hh2>
    <hp>
      Unleash your creativity with the Excalidraw plugin, which enables you to
      embed and draw diagrams directly within your editor.
    </hp>
    <hexcalidraw {...excalidrawInitialData}>
      <htext />
    </hexcalidraw>
  </fragment>
);
