import { AlignPlugin } from '@sewellstephens/plate-alignment';
import { AutoformatPlugin } from '@sewellstephens/plate-autoformat/react';
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
  ExitBreakPlugin,
  SingleLinePlugin,
  SoftBreakPlugin,
} from '@sewellstephens/plate-break/react';
import { CaptionPlugin } from '@sewellstephens/plate-caption/react';
import { CodeBlockPlugin } from '@sewellstephens/plate-code-block/react';
import { CommentsPlugin } from '@sewellstephens/plate-comments/react';
import { ParagraphPlugin } from '@sewellstephens/plate-common';
import { CsvPlugin } from '@sewellstephens/plate-csv';
import { DatePlugin } from '@sewellstephens/plate-date';
import { DndPlugin } from '@sewellstephens/plate-dnd';
import { DocxPlugin } from '@sewellstephens/plate-docx';
import { EmojiPlugin } from '@sewellstephens/plate-emoji';
import { ExcalidrawPlugin } from '@sewellstephens/plate-excalidraw/react';
import {
  FontBackgroundColorPlugin,
  FontColorPlugin,
  FontSizePlugin,
} from '@sewellstephens/plate-font';
import { HighlightPlugin } from '@sewellstephens/plate-highlight/react';
import { HorizontalRulePlugin } from '@sewellstephens/plate-horizontal-rule/react';
import { IndentPlugin } from '@sewellstephens/plate-indent/react';
import { IndentListPlugin } from '@sewellstephens/plate-indent-list/react';
import { JuicePlugin } from '@sewellstephens/plate-juice';
import { KbdPlugin } from '@sewellstephens/plate-kbd/react';
import { LineHeightPlugin } from '@sewellstephens/plate-line-height';
import { LinkPlugin } from '@sewellstephens/plate-link/react';
import { TodoListPlugin } from '@sewellstephens/plate-list/react';
import { MarkdownPlugin } from '@sewellstephens/plate-markdown';
import { ImagePlugin, MediaEmbedPlugin } from '@sewellstephens/plate-media/react';
import { MentionPlugin } from '@sewellstephens/plate-mention/react';
import { NodeIdPlugin } from '@sewellstephens/plate-node-id';
import { NormalizeTypesPlugin } from '@sewellstephens/plate-normalizers';
import { ResetNodePlugin } from '@sewellstephens/plate-reset-node';
import { DeletePlugin, SelectOnBackspacePlugin } from '@sewellstephens/plate-select';
import { BlockSelectionPlugin } from '@sewellstephens/plate-selection/react';
import { TabbablePlugin } from '@sewellstephens/plate-tabbable';
import { TablePlugin } from '@sewellstephens/plate-table/react';
import { TogglePlugin } from '@sewellstephens/plate-toggle/react';
import { TrailingBlockPlugin } from '@sewellstephens/plate-trailing-block';
import { uniqBy } from 'lodash';

import { customizerItems } from '@/config/customizer-items';
import { DragOverCursorPlugin } from '@/plate/demo/plugins/DragOverCursorPlugin';

export const customizerList = [
  {
    children: [
      customizerItems[BlockquotePlugin.key],
      customizerItems[CodeBlockPlugin.key],
      customizerItems[ExcalidrawPlugin.key],
      customizerItems[HorizontalRulePlugin.key],
      customizerItems[ImagePlugin.key],
      customizerItems[LinkPlugin.key],
      customizerItems[TogglePlugin.key],
      customizerItems.column,
      customizerItems.heading,
      customizerItems.list,
      customizerItems[MediaEmbedPlugin.key],
      customizerItems[MentionPlugin.key],
      customizerItems[ParagraphPlugin.key],
      customizerItems[TablePlugin.key],
      customizerItems[TodoListPlugin.key],
      customizerItems[DatePlugin.key],
    ],
    id: 'blocks',
    label: 'Nodes',
  },
  {
    children: [
      customizerItems[BoldPlugin.key],
      customizerItems[CodePlugin.key],
      customizerItems[CommentsPlugin.key],
      customizerItems[FontBackgroundColorPlugin.key],
      customizerItems[FontColorPlugin.key],
      customizerItems[FontSizePlugin.key],
      customizerItems[HighlightPlugin.key],
      customizerItems[ItalicPlugin.key],
      customizerItems[KbdPlugin.key],
      customizerItems[StrikethroughPlugin.key],
      customizerItems[SubscriptPlugin.key],
      customizerItems[SuperscriptPlugin.key],
      customizerItems[UnderlinePlugin.key],
    ],
    id: 'marks',
    label: 'Marks',
  },
  {
    children: [
      customizerItems[AlignPlugin.key],
      customizerItems[IndentPlugin.key],
      customizerItems[IndentListPlugin.key],
      customizerItems[LineHeightPlugin.key],
    ],
    id: 'style',
    label: 'Block Style',
  },
  {
    children: [
      customizerItems.components,
      customizerItems[AutoformatPlugin.key],
      customizerItems[BlockSelectionPlugin.key],
      customizerItems[CaptionPlugin.key],
      customizerItems[DndPlugin.key],
      customizerItems[DragOverCursorPlugin.key],
      customizerItems[EmojiPlugin.key],
      customizerItems[ExitBreakPlugin.key],
      customizerItems[NodeIdPlugin.key],
      customizerItems[NormalizeTypesPlugin.key],
      customizerItems[ResetNodePlugin.key],
      customizerItems[SelectOnBackspacePlugin.key],
      customizerItems[DeletePlugin.key],
      customizerItems[SingleLinePlugin.key],
      customizerItems[SoftBreakPlugin.key],
      customizerItems[TabbablePlugin.key],
      customizerItems[TrailingBlockPlugin.key],
    ],
    id: 'functionality',
    label: 'Functionality',
  },
  {
    children: [
      customizerItems[CsvPlugin.key],
      customizerItems[DocxPlugin.key],
      customizerItems[MarkdownPlugin.key],
      customizerItems[JuicePlugin.key],
    ],
    id: 'Deserialization',
    label: 'Deserialization',
  },
];

export const orderedPluginKeys = [
  ParagraphPlugin.key,
  'heading',
  BlockquotePlugin.key,
  CodeBlockPlugin,
  HorizontalRulePlugin.key,
  LinkPlugin.key,
  'list',
  ImagePlugin.key,
  MediaEmbedPlugin.key,
  CaptionPlugin.key,
  MentionPlugin.key,
  TablePlugin.key,
  TodoListPlugin.key,
  ExcalidrawPlugin.key,

  // Marks
  BoldPlugin.key,
  ItalicPlugin.key,
  UnderlinePlugin.key,
  StrikethroughPlugin.key,
  CodePlugin.key,
  SubscriptPlugin.key,
  SuperscriptPlugin.key,
  FontColorPlugin.key,
  FontBackgroundColorPlugin.key,
  FontSizePlugin.key,
  HighlightPlugin.key,
  KbdPlugin.key,

  // Block Style
  AlignPlugin.key,
  IndentPlugin.key,
  IndentListPlugin.key,
  LineHeightPlugin.key,

  // Functionality
  AutoformatPlugin.key,
  BlockSelectionPlugin.key,
  DndPlugin.key,
  EmojiPlugin.key,
  ExitBreakPlugin.key,
  NodeIdPlugin.key,
  NormalizeTypesPlugin.key,
  ResetNodePlugin.key,
  SelectOnBackspacePlugin.key,
  DeletePlugin.key,
  SingleLinePlugin.key,
  SoftBreakPlugin.key,
  TabbablePlugin.key,
  TrailingBlockPlugin.key,
  DragOverCursorPlugin.key,

  // Collaboration
  CommentsPlugin.key,

  // Deserialization
  DocxPlugin.key,
  CsvPlugin.key,
  MarkdownPlugin.key,
  JuicePlugin.key,
];

export const allPlugins = customizerList.flatMap((group) => group.children);

export const allComponents = uniqBy(
  allPlugins.flatMap((plugin) => plugin.components ?? []),
  'id'
);
