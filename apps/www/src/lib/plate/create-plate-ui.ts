// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { withProps } from '@sewellstephens/cn';
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from '@sewellstephens/plate-basic-marks/react';
import { BlockquotePlugin } from '@sewellstephens/plate-block-quote/react';
import {
  CodeBlockPlugin,
  CodeLinePlugin,
  CodeSyntaxPlugin,
} from '@sewellstephens/plate-code-block/react';
import { CommentsPlugin } from '@sewellstephens/plate-comments/react';
import { ParagraphPlugin } from '@sewellstephens/plate-common';
import {
  type NodeComponent,
  LateElement,
  LateLeaf,
} from '@sewellstephens/plate-common/react';
import { DatePlugin } from '@sewellstephens/plate-date';
import { EmojiInputPlugin } from '@sewellstephens/plate-emoji';
import { ExcalidrawPlugin } from '@sewellstephens/plate-excalidraw/react';
import { FindReplacePlugin } from '@sewellstephens/plate-find-replace';
import { HEADING_KEYS } from '@sewellstephens/plate-heading';
import { HighlightPlugin } from '@sewellstephens/plate-highlight/react';
import { HorizontalRulePlugin } from '@sewellstephens/plate-horizontal-rule/react';
import { KbdPlugin } from '@sewellstephens/plate-kbd/react';
import { ColumnItemPlugin, ColumnPlugin } from '@sewellstephens/plate-layout/react';
import { LinkPlugin } from '@sewellstephens/plate-link/react';
import {
  BulletedListPlugin,
  ListItemPlugin,
  NumberedListPlugin,
  TodoListPlugin,
} from '@sewellstephens/plate-list/react';
import { ImagePlugin, MediaEmbedPlugin } from '@sewellstephens/plate-media/react';
import {
  MentionInputPlugin,
  MentionPlugin,
} from '@sewellstephens/plate-mention/react';
import { SlashInputPlugin } from '@sewellstephens/plate-slash-command';
import {
  TableCellHeaderPlugin,
  TableCellPlugin,
  TablePlugin,
  TableRowPlugin,
} from '@sewellstephens/plate-table/react';
import { TogglePlugin } from '@sewellstephens/plate-toggle/react';

import { BlockquoteElement } from '@/registry/default/plate-ui/blockquote-element';
import { CodeBlockElement } from '@/registry/default/plate-ui/code-block-element';
import { CodeLeaf } from '@/registry/default/plate-ui/code-leaf';
import { CodeLineElement } from '@/registry/default/plate-ui/code-line-element';
import { CodeSyntaxLeaf } from '@/registry/default/plate-ui/code-syntax-leaf';
import { ColumnElement } from '@/registry/default/plate-ui/column-element';
import { ColumnGroupElement } from '@/registry/default/plate-ui/column-group-element';
import { CommentLeaf } from '@/registry/default/plate-ui/comment-leaf';
import { DateElement } from '@/registry/default/plate-ui/date-element';
import { EmojiInputElement } from '@/registry/default/plate-ui/emoji-input-element';
import { ExcalidrawElement } from '@/registry/default/plate-ui/excalidraw-element';
import { HeadingElement } from '@/registry/default/plate-ui/heading-element';
import { HighlightLeaf } from '@/registry/default/plate-ui/highlight-leaf';
import { HrElement } from '@/registry/default/plate-ui/hr-element';
import { ImageElement } from '@/registry/default/plate-ui/image-element';
import { KbdLeaf } from '@/registry/default/plate-ui/kbd-leaf';
import { LinkElement } from '@/registry/default/plate-ui/link-element';
import { ListElement } from '@/registry/default/plate-ui/list-element';
import { MediaEmbedElement } from '@/registry/default/plate-ui/media-embed-element';
import { MentionElement } from '@/registry/default/plate-ui/mention-element';
import { MentionInputElement } from '@/registry/default/plate-ui/mention-input-element';
import { ParagraphElement } from '@/registry/default/plate-ui/paragraph-element';
import { withPlaceholders } from '@/registry/default/plate-ui/placeholder';
import { SearchHighlightLeaf } from '@/registry/default/plate-ui/search-highlight-leaf';
import { SlashInputElement } from '@/registry/default/plate-ui/slash-input-element';
import {
  TableCellElement,
  TableCellHeaderElement,
} from '@/registry/default/plate-ui/table-cell-element';
import { TableElement } from '@/registry/default/plate-ui/table-element';
import { TableRowElement } from '@/registry/default/plate-ui/table-row-element';
import { TodoListElement } from '@/registry/default/plate-ui/todo-list-element';
import { ToggleElement } from '@/registry/default/plate-ui/toggle-element';
import { withDraggables } from '@/registry/default/plate-ui/with-draggables';

export const createLateUI = ({
  draggable,
  placeholder,
}: { draggable?: boolean; placeholder?: boolean } = {}) => {
  let components: Record<string, NodeComponent> = {
    [BlockquotePlugin.key]: BlockquoteElement,
    [BoldPlugin.key]: withProps(LateLeaf, { as: 'strong' }),
    [BulletedListPlugin.key]: withProps(ListElement, { variant: 'ul' }),
    [CodeBlockPlugin.key]: CodeBlockElement,
    [CodeLinePlugin.key]: CodeLineElement,
    [CodePlugin.key]: CodeLeaf,
    [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
    [ColumnItemPlugin.key]: ColumnElement,
    [ColumnPlugin.key]: ColumnGroupElement,
    [CommentsPlugin.key]: CommentLeaf,
    [DatePlugin.key]: DateElement,
    [EmojiInputPlugin.key]: EmojiInputElement,
    [ExcalidrawPlugin.key]: ExcalidrawElement,
    [FindReplacePlugin.key]: SearchHighlightLeaf,
    [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: 'h1' }),
    [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: 'h2' }),
    [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: 'h3' }),
    [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: 'h4' }),
    [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: 'h5' }),
    [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: 'h6' }),
    [HighlightPlugin.key]: HighlightLeaf,
    [HorizontalRulePlugin.key]: HrElement,
    [ImagePlugin.key]: ImageElement,
    [ItalicPlugin.key]: withProps(LateLeaf, { as: 'em' }),
    [KbdPlugin.key]: KbdLeaf,
    [LinkPlugin.key]: LinkElement,
    [ListItemPlugin.key]: withProps(LateElement, { as: 'li' }),
    [MediaEmbedPlugin.key]: MediaEmbedElement,
    [MentionInputPlugin.key]: MentionInputElement,
    [MentionPlugin.key]: MentionElement,
    [NumberedListPlugin.key]: withProps(ListElement, { variant: 'ol' }),
    [ParagraphPlugin.key]: ParagraphElement,
    [SlashInputPlugin.key]: SlashInputElement,
    [StrikethroughPlugin.key]: withProps(LateLeaf, { as: 's' }),
    [SubscriptPlugin.key]: withProps(LateLeaf, { as: 'sub' }),
    [SuperscriptPlugin.key]: withProps(LateLeaf, { as: 'sup' }),
    [TableCellHeaderPlugin.key]: TableCellHeaderElement,
    [TableCellPlugin.key]: TableCellElement,
    [TablePlugin.key]: TableElement,
    [TableRowPlugin.key]: TableRowElement,
    [TodoListPlugin.key]: TodoListElement,
    [TogglePlugin.key]: ToggleElement,
    [UnderlinePlugin.key]: withProps(LateLeaf, { as: 'u' }),
  };

  if (placeholder) {
    components = withPlaceholders(components);
  }
  if (draggable) {
    components = withDraggables(components);
  }

  return components;
};
