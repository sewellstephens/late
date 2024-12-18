import { useMemo } from 'react';

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
import { DndPlugin } from '@sewell_stephens/late-dnd';
import { DocxPlugin } from '@sewell_stephens/late-docx';
import { EmojiPlugin } from '@sewell_stephens/late-emoji';
import { ExcalidrawPlugin } from '@sewell_stephens/late-excalidraw/react';
import {
  FontBackgroundColorPlugin,
  FontColorPlugin,
  FontSizePlugin,
} from '@sewell_stephens/late-font';
import { HeadingPlugin } from '@sewell_stephens/late-heading/react';
import { HighlightPlugin } from '@sewell_stephens/late-highlight/react';
import { HorizontalRulePlugin } from '@sewell_stephens/late-horizontal-rule/react';
import { IndentPlugin } from '@sewell_stephens/late-indent/react';
import { IndentListPlugin } from '@sewell_stephens/late-indent-list/react';
import { JuicePlugin } from '@sewell_stephens/late-juice';
import { KbdPlugin } from '@sewell_stephens/late-kbd/react';
import { ColumnPlugin } from '@sewell_stephens/late-layout/react';
import { LineHeightPlugin } from '@sewell_stephens/late-line-height';
import { LinkPlugin } from '@sewell_stephens/late-link/react';
import { ListPlugin, TodoListPlugin } from '@sewell_stephens/late-list/react';
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

import { settingsStore } from '@/components/context/settings-store';
import { DragOverCursorPlugin } from '@/plate/demo/plugins/DragOverCursorPlugin';

export function usePlaygroundEnabled(id?: string) {
  const enabled = settingsStore.use.checkedPlugins();

  return useMemo(
    () => ({
      [AlignPlugin.key]: { enabled: !!enabled.align },
      [AutoformatPlugin.key]: { enabled: !!enabled.autoformat },
      [BlockSelectionPlugin.key]: {
        enabled: id === 'blockselection' || !!enabled.blockSelection,
      },
      [BlockquotePlugin.key]: { enabled: !!enabled.blockquote },
      [BoldPlugin.key]: { enabled: !!enabled.bold },
      [CaptionPlugin.key]: { enabled: !!enabled.caption },
      [CodeBlockPlugin.key]: { enabled: !!enabled.code_block },
      [CodePlugin.key]: { enabled: !!enabled.code },
      [ColumnPlugin.key]: { enabled: !!enabled.column },
      [CommentsPlugin.key]: { enabled: !!enabled.comment },
      [DeletePlugin.key]: { enabled: !!enabled.delete },
      [DndPlugin.key]: { enabled: !!enabled.dnd },
      [DocxPlugin.key]: { enabled: !!enabled.docx },
      [DragOverCursorPlugin.key]: { enabled: !!enabled.dragOverCursor },
      [EmojiPlugin.key]: { enabled: !!enabled.emoji },
      [ExcalidrawPlugin.key]: { enabled: !!enabled.excalidraw },
      [ExitBreakPlugin.key]: { enabled: !!enabled.exitBreak },
      [FontBackgroundColorPlugin.key]: {
        enabled: !!enabled.backgroundColor,
      },
      [FontColorPlugin.key]: { enabled: !!enabled.color },
      [FontSizePlugin.key]: { enabled: !!enabled.fontSize },
      [HeadingPlugin.key]: { enabled: !!enabled.heading },
      [HighlightPlugin.key]: { enabled: !!enabled.highlight },
      [HorizontalRulePlugin.key]: { enabled: !!enabled.hr },
      [ImagePlugin.key]: { enabled: !!enabled.img },
      [IndentListPlugin.key]: {
        enabled: id === 'indentlist' || !!enabled.listStyleType,
      },
      [IndentPlugin.key]: { enabled: !!enabled.indent },
      [ItalicPlugin.key]: { enabled: !!enabled.italic },
      [JuicePlugin.key]: { enabled: !!enabled.juice },
      [KbdPlugin.key]: { enabled: !!enabled.kbd },
      [LineHeightPlugin.key]: { enabled: !!enabled.lineHeight },
      [LinkPlugin.key]: { enabled: !!enabled.a },
      [ListPlugin.key]: { enabled: id === 'list' || !!enabled.list },
      [MarkdownPlugin.key]: { enabled: !!enabled.markdown },
      [MediaEmbedPlugin.key]: { enabled: !!enabled.media_embed },
      [MentionPlugin.key]: { enabled: !!enabled.mention },
      [NodeIdPlugin.key]: { enabled: !!enabled.nodeId },
      [NormalizeTypesPlugin.key]: { enabled: !!enabled.normalizeTypes },
      [ParagraphPlugin.key]: { enabled: !!enabled.p },
      [ResetNodePlugin.key]: { enabled: !!enabled.resetNode },
      [SelectOnBackspacePlugin.key]: {
        enabled: !!enabled.selectOnBackspace,
      },
      [SingleLinePlugin.key]: {
        enabled: id === 'singleline' || !!enabled.singleLine,
      },
      [SoftBreakPlugin.key]: { enabled: !!enabled.softBreak },
      [StrikethroughPlugin.key]: { enabled: !!enabled.strikethrough },
      [SubscriptPlugin.key]: { enabled: !!enabled.subscript },
      [SuperscriptPlugin.key]: { enabled: !!enabled.superscript },
      [TabbablePlugin.key]: { enabled: !!enabled.tabbable },
      [TablePlugin.key]: { enabled: !!enabled.table },
      [TodoListPlugin.key]: { enabled: !!enabled.action_item },
      [TogglePlugin.key]: { enabled: !!enabled.toggle },
      [TrailingBlockPlugin.key]: {
        enabled: id !== 'singleline' && !!enabled.trailingBlock,
      },
      [UnderlinePlugin.key]: { enabled: !!enabled.underline },
    }),
    [enabled, id]
  );
}
