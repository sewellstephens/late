import { useMemo } from 'react';

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
import { DndPlugin } from '@sewellstephens/plate-dnd';
import { DocxPlugin } from '@sewellstephens/plate-docx';
import { EmojiPlugin } from '@sewellstephens/plate-emoji';
import { ExcalidrawPlugin } from '@sewellstephens/plate-excalidraw/react';
import {
  FontBackgroundColorPlugin,
  FontColorPlugin,
  FontSizePlugin,
} from '@sewellstephens/plate-font';
import { HeadingPlugin } from '@sewellstephens/plate-heading/react';
import { HighlightPlugin } from '@sewellstephens/plate-highlight/react';
import { HorizontalRulePlugin } from '@sewellstephens/plate-horizontal-rule/react';
import { IndentPlugin } from '@sewellstephens/plate-indent/react';
import { IndentListPlugin } from '@sewellstephens/plate-indent-list/react';
import { JuicePlugin } from '@sewellstephens/plate-juice';
import { KbdPlugin } from '@sewellstephens/plate-kbd/react';
import { ColumnPlugin } from '@sewellstephens/plate-layout/react';
import { LineHeightPlugin } from '@sewellstephens/plate-line-height';
import { LinkPlugin } from '@sewellstephens/plate-link/react';
import { ListPlugin, TodoListPlugin } from '@sewellstephens/plate-list/react';
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
