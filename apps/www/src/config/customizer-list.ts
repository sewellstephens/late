import { AlignPlugin } from '@sewell_stephens/late-alignment';
import { AutoformatPlugin } from '@sewell_stephens/late-autoformat/react';
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from '@sewell_stephens/late-basic-marks/react';
import { BlockquotePlugin } from '@sewell_stephens/late-block-quote/react';
import {
  ExitBreakPlugin,
  SingleLinePlugin,
  SoftBreakPlugin,
} from '@sewell_stephens/late-break/react';
import { CaptionPlugin } from '@sewell_stephens/late-caption/react';
import { CodeBlockPlugin } from '@sewell_stephens/late-code-block/react';
import { CommentsPlugin } from '@sewell_stephens/late-comments/react';
import { ParagraphPlugin } from '@sewell_stephens/late-common';
import { CsvPlugin } from '@sewell_stephens/late-csv';
import { DatePlugin } from '@sewell_stephens/late-date';
import { DndPlugin } from '@sewell_stephens/late-dnd';
import { DocxPlugin } from '@sewell_stephens/late-docx';
import { EmojiPlugin } from '@sewell_stephens/late-emoji';
import { ExcalidrawPlugin } from '@sewell_stephens/late-excalidraw/react';
import {
  FontBackgroundColorPlugin,
  FontColorPlugin,
  FontSizePlugin,
} from '@sewell_stephens/late-font';
import { HighlightPlugin } from '@sewell_stephens/late-highlight/react';
import { HorizontalRulePlugin } from '@sewell_stephens/late-horizontal-rule/react';
import { IndentPlugin } from '@sewell_stephens/late-indent/react';
import { IndentListPlugin } from '@sewell_stephens/late-indent-list/react';
import { JuicePlugin } from '@sewell_stephens/late-juice';
import { KbdPlugin } from '@sewell_stephens/late-kbd/react';
import { LineHeightPlugin } from '@sewell_stephens/late-line-height';
import { LinkPlugin } from '@sewell_stephens/late-link/react';
import { TodoListPlugin } from '@sewell_stephens/late-list/react';
import { MarkdownPlugin } from '@sewell_stephens/late-markdown';
import { ImagePlugin, MediaEmbedPlugin } from '@sewell_stephens/late-media/react';
import { MentionPlugin } from '@sewell_stephens/late-mention/react';
import { NodeIdPlugin } from '@sewell_stephens/late-node-id';
import { NormalizeTypesPlugin } from '@sewell_stephens/late-normalizers';
import { ResetNodePlugin } from '@sewell_stephens/late-reset-node';
import { DeletePlugin, SelectOnBackspacePlugin } from '@sewell_stephens/late-select';
import { BlockSelectionPlugin } from '@sewell_stephens/late-selection/react';
import { TabbablePlugin } from '@sewell_stephens/late-tabbable';
import { TablePlugin } from '@sewell_stephens/late-table/react';
import { TogglePlugin } from '@sewell_stephens/late-toggle/react';
import { TrailingBlockPlugin } from '@sewell_stephens/late-trailing-block';
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
