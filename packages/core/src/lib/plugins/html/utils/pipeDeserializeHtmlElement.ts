import type { AnyObject } from '@sewell_stephens/utils';

import type { SlateEditor } from '../../../editor';
import type { HtmlDeserializer } from '../../../plugin/SlatePlugin';
import type { Nullable } from '../../../types/misc/Nullable';

import { pluginDeserializeHtml } from './pluginDeserializeHtml';

export const pipeDeserializeHtmlElement = (
  editor: SlateEditor,
  element: HTMLElement
) => {
  let result: ({ node: AnyObject } & Nullable<HtmlDeserializer>) | undefined;

  [...editor.pluginList].reverse().some((plugin) => {
    result = pluginDeserializeHtml(editor, plugin, { element });

    return !!result;
  });

  return result;
};
