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

import { DragOverCursorPlugin } from '@/plate/demo/plugins/DragOverCursorPlugin';

export const descriptions: Record<string, string> = {
  [AlignPlugin.key]: 'Align your content to different positions.',
  [AutoformatPlugin.key]: 'Apply formatting automatically using shortcodes.',
  [BlockSelectionPlugin.key]: 'Select and manipulate entire text blocks.',
  [BlockquotePlugin.key]: 'Highlight important text or citations.',
  [BoldPlugin.key]: 'Make your text stand out.',
  [CodePlugin.key]: 'Embed code into your text.',
  [CommentsPlugin.key]: 'Add comments to text as marks.',
  [CsvPlugin.key]: 'Copy paste from CSV to Slate.',
  [DatePlugin.key]: 'Add inline date plugins',
  [DeletePlugin.key]:
    'Remove the current block if empty when pressing delete forward',
  [DndPlugin.key]: 'Move blocks within the editor.',
  [DocxPlugin.key]: 'Copy paste from DOCX to Slate.',
  [DragOverCursorPlugin.key]: 'Customize the cursor when dragging.',
  [EmojiPlugin.key]: 'Enhance your text with emojis.',
  [ExcalidrawPlugin.key]: 'Create drawings and diagrams as block nodes.',
  [ExitBreakPlugin.key]: 'Exit a large block using a shortcut.',
  [FontBackgroundColorPlugin.key]: 'Add color to text backgrounds.',
  [FontColorPlugin.key]: 'Highlight text with a specific color.',
  [FontSizePlugin.key]: 'Adjust the size of the text.',
  [HighlightPlugin.key]: 'Mark and reference text for review.',
  [HorizontalRulePlugin.key]: 'Insert horizontal lines.',
  [ImagePlugin.key]: 'Embed images into your document.',
  [IndentListPlugin.key]:
    'Turn any block into a list item. Alternative to List.',
  [IndentPlugin.key]: 'Customize text indentation.',
  [ItalicPlugin.key]: 'Emphasize your text.',
  [JuicePlugin.key]:
    'Inline CSS properties into the `style` attribute when pasting HTML.',
  [KbdPlugin.key]: 'Indicate keyboard inputs or commands.',
  [LineHeightPlugin.key]: 'Adjust the height between lines of text.',
  [LinkPlugin.key]: 'Insert and manage hyperlinks.',
  [MarkdownPlugin.key]: 'Copy paste from MD to Slate.',
  [MediaEmbedPlugin.key]:
    'Embed medias like videos or tweets into your document.',
  [MentionPlugin.key]: 'Enable autocompletion for user mentions.',
  [NodeIdPlugin.key]:
    'Assign unique identifiers to nodes within your document.',
  [NormalizeTypesPlugin.key]: 'Enforce block types using rules.',
  [ParagraphPlugin.key]:
    'The foundational block in your editor, serving as the default block for text entry',
  [ResetNodePlugin.key]: 'Reset the block type using rules.',
  [SelectOnBackspacePlugin.key]:
    'Select the preceding block instead of deleting when pressing backspace.',
  [SingleLinePlugin.key]: 'Restrict the editor to a single block.',
  [SoftBreakPlugin.key]:
    'Insert line breaks within a block of text without starting a new block.',
  [StrikethroughPlugin.key]:
    'Cross out text to indicate deletion or correction.',
  [SubscriptPlugin.key]: 'Lower portions of your text.',
  [SuperscriptPlugin.key]: 'Elevate portions of your text.',
  [TabbablePlugin.key]:
    'Maintain a consistent tab order for tabbable elements.',
  [TablePlugin.key]:
    'Organize and display data in a structured and resizable tabular format.',
  [TodoListPlugin.key]: 'Manage tasks within your document.',
  [TogglePlugin.key]: 'Add toggles to your document.',
  [TrailingBlockPlugin.key]:
    'Automatically add a new paragraph after the final block.',
  [UnderlinePlugin.key]: 'Emphasize specific words or phrases in your text.',
  caption: 'Add captions to your blocks.',
  code_block: 'Encapsulate blocks of code.',
  column: 'Add column plugins',
  components: 'Components.',
  heading: 'Organize your document with up to 6 headings.',
  list: 'Organize nestable items in a bulleted or numbered list.',
};
