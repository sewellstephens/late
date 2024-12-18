import React from 'react';

import type { TEditableProps } from '@sewell_stephens/slate-react';

import type { LateEditor } from '../editor/LateEditor';
import type { LateRenderLeafProps } from '../plugin/LateRenderLeafProps';

import { pipeInjectNodeProps } from '../../lib';
import { DefaultLeaf } from '../components';
import { type RenderLeaf, pluginRenderLeaf } from './pluginRenderLeaf';

/** @see {@link RenderLeaf} */
export const pipeRenderLeaf = (
  editor: LateEditor,
  renderLeafProp?: TEditableProps['renderLeaf']
): TEditableProps['renderLeaf'] => {
  const renderLeafs: RenderLeaf[] = [];

  editor.pluginList.forEach((plugin) => {
    if (plugin.node.isLeaf && plugin.key) {
      renderLeafs.push(pluginRenderLeaf(editor, plugin));
    }
  });

  return function render(nodeProps) {
    const props = pipeInjectNodeProps(
      editor,
      nodeProps
    ) as LateRenderLeafProps;

    renderLeafs.forEach((renderLeaf) => {
      const newChildren = renderLeaf(props as any);

      if (newChildren !== undefined) {
        props.children = newChildren;
      }
    });

    if (renderLeafProp) {
      return renderLeafProp(props);
    }

    return <DefaultLeaf {...props} />;
  };
};
