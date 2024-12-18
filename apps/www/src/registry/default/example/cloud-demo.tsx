import React from 'react';

import { BasicElementsPlugin } from '@sewell_stephens/late-basic-elements/react';
import { BasicMarksPlugin } from '@sewell_stephens/late-basic-marks/react';
import {
  CloudAttachmentPlugin,
  CloudImagePlugin,
  CloudPlugin,
} from '@sewell_stephens/late-cloud';
import { Late } from '@sewell_stephens/late-common/react';
import { useLateEditor } from '@sewell_stephens/late-core/react';

import { uploadStoreInitialValue } from '@/plate/demo/cloud/uploadStoreInitialValue';
import { editableProps } from '@/plate/demo/editableProps';
import { LateUI } from '@/plate/demo/plate-ui';
import { cloudValue } from '@/plate/demo/values/cloudValue';
import { CloudAttachmentElement } from '@/registry/default/plate-ui/cloud-attachment-element';
import { CloudImageElement } from '@/registry/default/plate-ui/cloud-image-element';
import { CloudToolbarButtons } from '@/registry/default/plate-ui/cloud-toolbar-buttons';
import { Editor } from '@/registry/default/plate-ui/editor';
import { FixedToolbar } from '@/registry/default/plate-ui/fixed-toolbar';

export default function CloudDemo() {
  const editor = useLateEditor({
    override: { components: LateUI },
    plugins: [
      BasicElementsPlugin,
      BasicMarksPlugin,
      CloudPlugin.configure({
        options: {
          authToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InB1UFoyZTdlN0tUVzh0MjQifQ.eyJpYXQiOjE2Njg0NTUxMDksImV4cCI6MTcwMDAxMjcwOX0.xEznN3Wl6GqN57wsDGq0Z6giI4TvU32gvmMJUzcg2No',
          uploadStoreInitialValue,
        },
      }),
      CloudAttachmentPlugin.withComponent(CloudAttachmentElement),
      CloudImagePlugin.configure({
        options: {
          maxInitialHeight: 320,
          maxInitialWidth: 320,
          maxResizeWidth: 720,
          minResizeWidth: 100,
        },
      }).withComponent(CloudImageElement),
    ],
    value: cloudValue,
  });

  return (
    <Late editor={editor}>
      <FixedToolbar>
        <CloudToolbarButtons />
      </FixedToolbar>

      <Editor className="mt-2" {...editableProps} />
    </Late>
  );
}
