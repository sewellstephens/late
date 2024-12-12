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
