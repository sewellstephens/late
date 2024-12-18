import type { OnChange } from '@sewell_stephens/late-common/react';

import { getEditorPlugin } from '@sewell_stephens/late-common';

import type { BlockSelectionConfig } from '../BlockSelectionPlugin';

import { BlockContextMenuPlugin } from '../BlockContextMenuPlugin';

export const onChangeBlockSelection: OnChange<BlockSelectionConfig> = ({
  api,
  editor,
  getOptions,
}) => {
  const blockContextMenu = getEditorPlugin(editor, BlockContextMenuPlugin);

  if (
    editor.selection &&
    getOptions().isSelecting &&
    !blockContextMenu.getOption('isOpen', editor.id)
  ) {
    api.blockSelection.unselect();
    blockContextMenu.api.blockContextMenu.hide();
  }
};
