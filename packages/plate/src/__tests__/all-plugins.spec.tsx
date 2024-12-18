import React from 'react';

import { render } from '@testing-library/react';
import { AlignPlugin } from '@sewell_stephens/late-alignment';
import { AutoformatPlugin } from '@sewell_stephens/late-autoformat';
import { BasicElementsPlugin } from '@sewell_stephens/late-basic-elements';
import { BasicMarksPlugin } from '@sewell_stephens/late-basic-marks';
import { BlockquotePlugin } from '@sewell_stephens/late-block-quote';
import { ExitBreakPlugin, SoftBreakPlugin } from '@sewell_stephens/late-break';
import {
  Late,
  LateContent,
  useLateEditor,
} from '@sewell_stephens/late-common/react';
import { HeadingPlugin } from '@sewell_stephens/late-heading';
import { HighlightPlugin } from '@sewell_stephens/late-highlight';
import { LinkPlugin } from '@sewell_stephens/late-link';
import { ListPlugin, TodoListPlugin } from '@sewell_stephens/late-list';
import { ImagePlugin, MediaEmbedPlugin } from '@sewell_stephens/late-media';
import { MentionPlugin } from '@sewell_stephens/late-mention';
import { NodeIdPlugin } from '@sewell_stephens/late-node-id';
import { NormalizeTypesPlugin } from '@sewell_stephens/late-normalizers';
import { ResetNodePlugin } from '@sewell_stephens/late-reset-node';
import { SelectOnBackspacePlugin } from '@sewell_stephens/late-select';
import { TablePlugin } from '@sewell_stephens/late-table';
import { TrailingBlockPlugin } from '@sewell_stephens/late-trailing-block';

function LateContainer() {
  const editor = useLateEditor({
    plugins: [
      BlockquotePlugin,
      TodoListPlugin,
      HeadingPlugin.configure({ options: { levels: 5 } }),
      BasicElementsPlugin,
      BasicMarksPlugin,
      TodoListPlugin,
      ImagePlugin,
      LinkPlugin,
      ListPlugin,
      TablePlugin,
      MediaEmbedPlugin,
      AlignPlugin,
      HighlightPlugin,
      MentionPlugin,
      NodeIdPlugin,
      AutoformatPlugin,
      ResetNodePlugin,
      SoftBreakPlugin,
      ExitBreakPlugin,
      NormalizeTypesPlugin,
      TrailingBlockPlugin,
      SelectOnBackspacePlugin,
    ],
  });

  return (
    <Late editor={editor}>
      <LateContent />
    </Late>
  );
}

describe('when all plugins', () => {
  it('should render', () => {
    render(<LateContainer />);

    expect(1).toBe(1);
  });
});
