import React from 'react';

import { BasicElementsPlugin } from '@sewell_stephens/late-basic-elements/react';
import { BasicMarksPlugin } from '@sewell_stephens/late-basic-marks/react';
import { Late, useLateEditor } from '@sewell_stephens/late-common/react';
import { HorizontalRulePlugin } from '@sewell_stephens/late-horizontal-rule/react';
import { ImagePlugin } from '@sewell_stephens/late-media/react';
import { SelectOnBackspacePlugin } from '@sewell_stephens/late-select';

import { PlaygroundTurnIntoDropdownMenu } from '@/components/plate-ui/playground-turn-into-dropdown-menu';
import { LateUI } from '@/plate/demo/plate-ui';
import { basicElementsValue } from '@/plate/demo/values/basicElementsValue';
import { basicMarksValue } from '@/plate/demo/values/basicMarksValue';
import { imageValue } from '@/plate/demo/values/mediaValue';
import { Editor } from '@/registry/default/plate-ui/editor';
import { FixedToolbar } from '@/registry/default/plate-ui/fixed-toolbar';
import { Separator } from '@/registry/default/plate-ui/separator';

export default function MultipleEditorsDemo() {
  const editor = useLateEditor({
    override: { components: LateUI },
    plugins: [BasicElementsPlugin, BasicMarksPlugin],
    value: basicElementsValue,
  });

  const editorMarks = useLateEditor({
    id: 'marks',
    override: { components: LateUI },
    plugins: [BasicElementsPlugin, BasicMarksPlugin],
    value: basicMarksValue,
  });

  const editorImage = useLateEditor({
    id: 'marks',
    override: { components: LateUI },
    plugins: [
      BasicElementsPlugin,
      BasicMarksPlugin,
      ImagePlugin,
      SelectOnBackspacePlugin.configure({
        options: {
          query: {
            allow: [ImagePlugin.key, HorizontalRulePlugin.key],
          },
        },
      }),
    ],
    value: imageValue,
  });

  return (
    <Late editor={editor}>
      <Late editor={editorMarks}>
        <Late editor={editorImage}>
          <FixedToolbar>
            <PlaygroundTurnIntoDropdownMenu />
          </FixedToolbar>

          <div>
            <Editor />
            <Separator />
            <Editor id="marks" />
            <Separator />
            <Editor id="image" />
          </div>
        </Late>
      </Late>
    </Late>
  );
}
