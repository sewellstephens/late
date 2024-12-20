import type { TRenderLeafProps } from '@sewell_stephens/slate-react';

import { getEditorPlugin, pipeInjectNodeProps } from '@sewell_stephens/late-common';
import {
  type LateEditor,
  type LateProps,
  pluginRenderLeaf,
} from '@sewell_stephens/late-common/react';
import { decode } from 'html-entities';

import { stripClassNames } from '../lib';
import { createElementWithSlate } from './utils/createElementWithSlate';
import { renderToStaticMarkup } from './utils/renderToStaticMarkupClient';

export const leafToHtml = (
  editor: LateEditor,
  {
    plateProps,
    preserveClassNames,
    props,
  }: {
    plateProps?: Partial<LateProps>;
    preserveClassNames?: string[];
    props: TRenderLeafProps;
  }
) => {
  const { children } = props;

  return editor.pluginList.reduce((result, plugin) => {
    if (!plugin.node.isLeaf) return result;

    props = {
      ...pipeInjectNodeProps(editor, props),
      children: result,
      ...getEditorPlugin(editor, plugin),
    };

    const serializer = plugin.parsers.htmlReact?.serializer;

    if (
      serializer === null ||
      (serializer?.query && !serializer.query(props as any))
    ) {
      return result;
    }

    const serialized =
      serializer?.parse?.(props as any) ??
      pluginRenderLeaf(editor, plugin)(props as any);

    if (serialized === children) return result;

    let html = decode(
      renderToStaticMarkup(
        createElementWithSlate({
          ...plateProps,
          children: serialized,
        })
      )
    );

    html = stripClassNames(html, { preserveClassNames });

    return html;
  }, children);
};
