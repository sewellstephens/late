import { AlignPlugin } from '@sewell_stephens/late-alignment';
import { AutoformatPlugin } from '@sewell_stephens/late-autoformat/react';
import {
  ExitBreakPlugin,
  SingleLinePlugin,
  SoftBreakPlugin,
} from '@sewell_stephens/late-break/react';
import { CaptionPlugin } from '@sewell_stephens/late-caption/react';
import { CommentsPlugin } from '@sewell_stephens/late-comments/react';
import { CsvPlugin } from '@sewell_stephens/late-csv';
import { DatePlugin } from '@sewell_stephens/late-date';
import { DndPlugin } from '@sewell_stephens/late-dnd';
import { DocxPlugin } from '@sewell_stephens/late-docx';
import { EmojiPlugin } from '@sewell_stephens/late-emoji';
import { ExcalidrawPlugin } from '@sewell_stephens/late-excalidraw/react';
import { FontBackgroundColorPlugin, FontSizePlugin } from '@sewell_stephens/late-font';
import { HighlightPlugin } from '@sewell_stephens/late-highlight/react';
import { HorizontalRulePlugin } from '@sewell_stephens/late-horizontal-rule/react';
import { IndentPlugin } from '@sewell_stephens/late-indent/react';
import { IndentListPlugin } from '@sewell_stephens/late-indent-list/react';
import { KbdPlugin } from '@sewell_stephens/late-kbd/react';
import { ColumnPlugin } from '@sewell_stephens/late-layout/react';
import { LineHeightPlugin } from '@sewell_stephens/late-line-height';
import { LinkPlugin } from '@sewell_stephens/late-link/react';
import { TodoListPlugin } from '@sewell_stephens/late-list/react';
import { MarkdownPlugin } from '@sewell_stephens/late-markdown';
import { ImagePlugin, MediaEmbedPlugin } from '@sewell_stephens/late-media/react';
import { MentionPlugin } from '@sewell_stephens/late-mention/react';
import { NodeIdPlugin } from '@sewell_stephens/late-node-id';
import { NormalizeTypesPlugin } from '@sewell_stephens/late-normalizers';
import { ResetNodePlugin } from '@sewell_stephens/late-reset-node';
import { BlockSelectionPlugin } from '@sewell_stephens/late-selection/react';
import { TabbablePlugin } from '@sewell_stephens/late-tabbable';
import { TablePlugin } from '@sewell_stephens/late-table/react';
import { TogglePlugin } from '@sewell_stephens/late-toggle/react';
import { TrailingBlockPlugin } from '@sewell_stephens/late-trailing-block';

import { columnValue } from '@/lib/plate/demo/values/columnValue';
import { DragOverCursorPlugin } from '@/plate/demo/plugins/DragOverCursorPlugin';
import { alignValue } from '@/plate/demo/values/alignValue';
import { autoformatValue } from '@/plate/demo/values/autoformatValue';
import { basicElementsValue } from '@/plate/demo/values/basicElementsValue';
import { basicMarksValue } from '@/plate/demo/values/basicMarksValue';
import { commentsValue } from '@/plate/demo/values/commentsValue';
import { cursorOverlayValue } from '@/plate/demo/values/cursorOverlayValue';
import { dateValue } from '@/plate/demo/values/dateValue';
import { deserializeCsvValue } from '@/plate/demo/values/deserializeCsvValue';
import { deserializeDocxValue } from '@/plate/demo/values/deserializeDocxValue';
import { deserializeHtmlValue } from '@/plate/demo/values/deserializeHtmlValue';
import { deserializeMdValue } from '@/plate/demo/values/deserializeMdValue';
import { emojiValue } from '@/plate/demo/values/emojiValue';
import { excalidrawValue } from '@/plate/demo/values/excalidrawValue';
import {
  exitBreakValue,
  trailingBlockValue,
} from '@/plate/demo/values/exitBreakValue';
import { fontValue } from '@/plate/demo/values/fontValue';
import { highlightValue } from '@/plate/demo/values/highlightValue';
import { horizontalRuleValue } from '@/plate/demo/values/horizontalRuleValue';
import { indentListValue } from '@/plate/demo/values/indentListValue';
import { indentValue } from '@/plate/demo/values/indentValue';
import { kbdValue } from '@/plate/demo/values/kbdValue';
import { lineHeightValue } from '@/plate/demo/values/lineHeightValue';
import { linkValue } from '@/plate/demo/values/linkValue';
import { listValue, todoListValue } from '@/plate/demo/values/listValue';
import { mediaValue } from '@/plate/demo/values/mediaValue';
import { mentionValue } from '@/plate/demo/values/mentionValue';
import { placeholderValue } from '@/plate/demo/values/placeholderValue';
import { singleLineValue } from '@/plate/demo/values/singleLineValue';
import { softBreakValue } from '@/plate/demo/values/softBreakValue';
import { tabbableValue } from '@/plate/demo/values/tabbableValue';
import { tableValue } from '@/plate/demo/values/tableValue';
import { toggleValue } from '@/plate/demo/values/toggleValue';

export type ValueId = 'tableMerge' | keyof typeof customizerPlugins;

// cmdk needs lowercase
export const customizerPlugins = {
  align: {
    id: 'align',
    label: 'Align',
    plugins: [AlignPlugin.key],
    route: '/docs/alignment',
    value: alignValue,
  },
  autoformat: {
    id: 'autoformat',
    label: 'Autoformat',
    plugins: [AutoformatPlugin.key],
    route: '/docs/autoformat',
    value: autoformatValue,
  },
  basicmarks: {
    id: 'basicmarks',
    label: 'Basic Marks',
    plugins: [],
    route: '/docs/basic-marks',
    value: [...basicElementsValue, ...basicMarksValue],
  },
  basicnodes: {
    id: 'basicnodes',
    label: 'Basic Nodes',
    plugins: [],
    route: '/docs/basic-elements',
    value: [...basicElementsValue, ...basicMarksValue],
  },
  blockselection: {
    id: 'blockselection',
    label: 'Block Selection',
    plugins: [
      NodeIdPlugin.key,
      BlockSelectionPlugin.key,
      ImagePlugin.key,
      MediaEmbedPlugin.key,
    ],
    route: '/docs/block-selection',
    value: mediaValue,
  },
  caption: {
    id: 'caption',
    label: 'Caption',
    plugins: [CaptionPlugin.key],
    route: '/docs/caption',
    value: mediaValue,
  },
  column: {
    id: 'column',
    label: 'Column',
    plugins: [ColumnPlugin.key],
    route: '/docs/column',
    value: columnValue,
  },
  comment: {
    id: 'comment',
    label: 'Comment',
    plugins: [CommentsPlugin.key],
    route: '/docs/comments',
    value: commentsValue,
  },
  csv: {
    id: 'csv',
    label: 'CSV',
    plugins: [CsvPlugin.key],
    route: '/docs/csv',
    value: deserializeCsvValue,
  },
  cursoroverlay: {
    id: 'cursoroverlay',
    label: 'Cursor Overlay',
    plugins: [DragOverCursorPlugin.key],
    route: '/docs/cursor-overlay',
    value: cursorOverlayValue,
  },
  date: {
    id: 'date',
    label: 'Date',
    plugins: [DatePlugin.key],
    route: '/docs/date',
    value: dateValue,
  },
  dnd: {
    id: 'dnd',
    label: 'Drag & Drop',
    plugins: [DndPlugin.key],
    route: '/docs/components/draggable',
    value: [],
  },
  docx: {
    id: 'docx',
    label: 'DOCX',
    plugins: [DocxPlugin.key],
    route: '/docs/docx',
    value: deserializeDocxValue,
  },
  emoji: {
    id: 'emoji',
    label: 'Emoji',
    plugins: [EmojiPlugin.key],
    route: '/docs/emoji',
    value: emojiValue,
  },
  excalidraw: {
    id: 'excalidraw',
    label: 'Excalidraw',
    plugins: [ExcalidrawPlugin.key],
    route: '/docs/excalidraw',
    value: excalidrawValue,
  },
  exitbreak: {
    id: 'exitbreak',
    label: 'Exit Break',
    plugins: [ExitBreakPlugin.key],
    route: '/docs/exit-break',
    value: exitBreakValue,
  },
  font: {
    id: 'font',
    label: 'Font',
    plugins: [FontSizePlugin.key, FontBackgroundColorPlugin.key],
    route: '/docs/font',
    value: fontValue,
  },
  forcedlayout: {
    id: 'forcedlayout',
    label: 'Forced Layout',
    plugins: [NormalizeTypesPlugin.key, TrailingBlockPlugin.key],
    route: '/docs/forced-layout',
    value: [],
  },
  highlight: {
    id: 'highlight',
    label: 'Highlight',
    plugins: [HighlightPlugin.key],
    route: '/docs/highlight',
    value: highlightValue,
  },
  hr: {
    id: 'hr',
    label: 'Horizontal Rule',
    plugins: [HorizontalRulePlugin.key],
    route: '/docs/horizontal-rule',
    value: horizontalRuleValue,
  },
  html: {
    id: 'html',
    label: 'HTML',
    plugins: [],
    route: '/docs/html',
    value: deserializeHtmlValue,
  },
  indent: {
    id: 'indent',
    label: 'Indent',
    plugins: [IndentPlugin.key],
    route: '/docs/indent',
    value: indentValue,
  },
  indentlist: {
    id: 'indentlist',
    label: 'Indent List',
    plugins: [IndentListPlugin.key],
    route: '/docs/indent-list',
    value: indentListValue,
  },
  kbd: {
    id: 'kbd',
    label: 'Keyboard Input',
    plugins: [KbdPlugin.key],
    route: '/docs/components/kbd-leaf',
    value: kbdValue,
  },
  lineheight: {
    id: 'lineheight',
    label: 'Line Height',
    plugins: [LineHeightPlugin.key],
    route: '/docs/line-height',
    value: lineHeightValue,
  },
  link: {
    id: 'link',
    label: 'Link',
    plugins: [LinkPlugin.key],
    route: '/docs/link',
    value: linkValue,
  },
  list: {
    id: 'list',
    label: 'List',
    plugins: ['list'],
    route: '/docs/list',
    value: listValue,
  },
  markdown: {
    id: 'markdown',
    label: 'Markdown',
    plugins: [MarkdownPlugin.key],
    route: '/docs/markdown',
    value: deserializeMdValue,
  },
  media: {
    id: 'media',
    label: 'Media',
    plugins: [ImagePlugin.key, MediaEmbedPlugin.key],
    route: '/docs/media',
    value: mediaValue,
  },
  mention: {
    id: 'mention',
    label: 'Mention',
    plugins: [MentionPlugin.key],
    route: '/docs/mention',
    value: mentionValue,
  },
  placeholder: {
    id: 'placeholder',
    label: 'Placeholder',
    plugins: [],
    route: '/docs/components/placeholder',
    value: placeholderValue,
  },
  playground: {
    id: 'playground',
    label: 'Playground',
    value: [],
  },
  resetnode: {
    id: 'resetnode',
    label: 'Reset Node',
    plugins: [ResetNodePlugin.key],
    route: '/docs/reset-node',
    value: [],
  },
  singleline: {
    id: 'singleline',
    label: 'Single Line',
    plugins: [SingleLinePlugin.key],
    route: '/docs/single-line',
    value: singleLineValue,
  },
  softbreak: {
    id: 'softbreak',
    label: 'Soft Break',
    plugins: [SoftBreakPlugin.key],
    route: '/docs/soft-break',
    value: softBreakValue,
  },
  tabbable: {
    id: 'tabbable',
    label: 'Tabbable',
    plugins: [TabbablePlugin.key],
    route: '/docs/tabbable',
    value: tabbableValue,
  },
  table: {
    id: 'table',
    label: 'Table',
    plugins: [TablePlugin.key],
    route: '/docs/table',
    value: tableValue,
  },
  todoli: {
    id: 'todoli',
    label: 'Todo List',
    plugins: [TodoListPlugin.key],
    route: '/docs/list',
    value: todoListValue,
  },
  toggle: {
    id: 'toggle',
    label: 'Toggle',
    plugins: [TogglePlugin.key],
    route: '/docs/toggle',
    value: toggleValue,
  },
  trailingblock: {
    id: 'trailingblock',
    label: 'Trailing Block',
    plugins: [TrailingBlockPlugin.key],
    route: '/docs/trailing-block',
    value: trailingBlockValue,
  },
};
