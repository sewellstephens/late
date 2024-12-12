import React from 'react';

import { render } from '@testing-library/react';
import { AlignPlugin } from '@sewellstephens/plate-alignment';
import { AutoformatPlugin } from '@sewellstephens/plate-autoformat';
import { BasicElementsPlugin } from '@sewellstephens/plate-basic-elements';
import { BasicMarksPlugin } from '@sewellstephens/plate-basic-marks';
import { BlockquotePlugin } from '@sewellstephens/plate-block-quote';
import { ExitBreakPlugin, SoftBreakPlugin } from '@sewellstephens/plate-break';
import {
  Plate,
  PlateContent,
  usePlateEditor,
} from '@sewellstephens/plate-common/react';
import { HeadingPlugin } from '@sewellstephens/plate-heading';
import { HighlightPlugin } from '@sewellstephens/plate-highlight';
import { LinkPlugin } from '@sewellstephens/plate-link';
import { ListPlugin, TodoListPlugin } from '@sewellstephens/plate-list';
import { ImagePlugin, MediaEmbedPlugin } from '@sewellstephens/plate-media';
import { MentionPlugin } from '@sewellstephens/plate-mention';
import { NodeIdPlugin } from '@sewellstephens/plate-node-id';
import { NormalizeTypesPlugin } from '@sewellstephens/plate-normalizers';
import { ResetNodePlugin } from '@sewellstephens/plate-reset-node';
import { SelectOnBackspacePlugin } from '@sewellstephens/plate-select';
import { TablePlugin } from '@sewellstephens/plate-table';
import { TrailingBlockPlugin } from '@sewellstephens/plate-trailing-block';

function PlateContainer() {
  const editor = usePlateEditor({
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
    <Plate editor={editor}>
      <PlateContent />
    </Plate>
  );
}

describe('when all plugins', () => {
  it('should render', () => {
    render(<PlateContainer />);

    expect(1).toBe(1);
  });
});
