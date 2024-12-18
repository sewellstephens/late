import React from 'react';

import type { LateEditor } from '../editor/LateEditor';
import type { AnyEditorLatePlugin } from '../plugin/LatePlugin';
import type { LateRenderLeafProps } from '../plugin/LateRenderLeafProps';

import { DefaultLeaf } from '../components/DefaultLeaf';
import { getRenderNodeProps } from './getRenderNodeProps';

export type RenderLeaf = (props: LateRenderLeafProps) => React.ReactElement;

/**
 * Get a `Editable.renderLeaf` handler for `plugin.node.type`. If the type is
 * equals to the slate leaf type, render `plugin.render.node`. Else, return
 * `children`.
 */
export const pluginRenderLeaf = (
  editor: LateEditor,
  plugin: AnyEditorLatePlugin
): RenderLeaf =>
  function render(nodeProps) {
    const {
      render: { node },
    } = plugin;
    const { children, leaf } = nodeProps;

    if (leaf[plugin.node.type ?? plugin.key]) {
      const Leaf = node ?? DefaultLeaf;

      const ctxProps = getRenderNodeProps({
        attributes: leaf.attributes as any,
        editor,
        plugin,
        props: nodeProps as any,
      }) as any;

      return <Leaf {...ctxProps}>{children}</Leaf>;
    }

    return children;
  };
