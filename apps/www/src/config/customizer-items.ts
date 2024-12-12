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
import {
  CodeBlockPlugin,
  CodeLinePlugin,
  CodeSyntaxPlugin,
} from '@sewellstephens/plate-code-block/react';
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
import {
  MentionInputPlugin,
  MentionPlugin,
} from '@sewellstephens/plate-mention/react';
import { NodeIdPlugin } from '@sewellstephens/plate-node-id';
import { NormalizeTypesPlugin } from '@sewellstephens/plate-normalizers';
import { ResetNodePlugin } from '@sewellstephens/plate-reset-node';
import { DeletePlugin, SelectOnBackspacePlugin } from '@sewellstephens/plate-select';
import { BlockSelectionPlugin } from '@sewellstephens/plate-selection/react';
import { TabbablePlugin } from '@sewellstephens/plate-tabbable';
import { TablePlugin } from '@sewellstephens/plate-table/react';
import { TogglePlugin } from '@sewellstephens/plate-toggle/react';
import { TrailingBlockPlugin } from '@sewellstephens/plate-trailing-block';

import {
  type CustomizerBadge,
  customizerBadges,
} from '@/config/customizer-badges';
import { customizerComponents } from '@/config/customizer-components';
import { customizerPlugins } from '@/config/customizer-plugins';
import { DragOverCursorPlugin } from '@/plate/demo/plugins/DragOverCursorPlugin';

export type SettingPlugin = {
  badges?: CustomizerBadge[];
  cnImports?: string[];
  components?: {
    cnImports?: string[];
    customImports?: string[];
    filename?: string; // e.g. 'blockquote-element' (default: id)
    id: string; // e.g. 'blockquote-element'
    import?: string;
    label: string; // e.g. 'Blockquote'
    noImport?: boolean;
    plateImports?: string[];
    pluginImports?: string[];
    pluginKey?: string; // Plugin components only, e.g. 'BlockquotePlugin.key'
    pluginOptions?: string[];
    registry?: string;
    route?: string;
    usage: string; // e.g. 'BlockquoteElement'
  }[];
  conflicts?: string[];
  customImports?: string[];
  dependencies?: string[];
  disablePlugins?: string[];
  id: string;
  label?: string;
  npmPackage?: string;
  packageImports?: string[];
  plateImports?: string[];
  pluginFactory?: string;
  pluginOptions?: string[];
  reactImport?: boolean;
  route?: string;
};

export const customizerItems: Record<string, SettingPlugin> = {
  [AlignPlugin.key]: {
    badges: [customizerBadges.style],
    id: AlignPlugin.key,
    label: 'Align',
    npmPackage: '@sewellstephens/plate-alignment',
    pluginFactory: 'AlignPlugin',
    pluginOptions: [`inject: { targetPlugins: ['p', 'h1', 'h2', 'h3'] },`],
    route: customizerPlugins.align.route,
  },
  // Functionality
  [AutoformatPlugin.key]: {
    badges: [customizerBadges.handler],
    id: AutoformatPlugin.key,
    label: 'Autoformat',
    npmPackage: '@sewellstephens/plate-autoformat',
    pluginFactory: 'AutoformatPlugin',
    pluginOptions: [
      `options: {`,
      `  enableUndoOnDelete: true,`,
      `  rules: [`,
      `    // Usage: https://platejs.org/docs/autoformat`,
      `  ],`,
      `},`,
    ],
    reactImport: true,
    route: customizerPlugins.autoformat.route,
  },
  [BlockSelectionPlugin.key]: {
    badges: [customizerBadges.ui],
    dependencies: [NodeIdPlugin.key],
    id: BlockSelectionPlugin.key,
    label: 'Block Selection',
    npmPackage: '@sewellstephens/plate-selection',
    pluginFactory: 'BlockSelectionPlugin',
    // pluginOptions: [
    //   `options: {`,
    //   `  sizes: {`,
    //   `    top: 0,`,
    //   `    bottom: 0,`,
    //   `  },`,
    //   `},`,
    // ],
    reactImport: true,
    route: customizerPlugins.blockselection.route,
  },
  [BlockquotePlugin.key]: {
    badges: [customizerBadges.element],
    components: [
      {
        id: 'blockquote-element',
        label: 'BlockquoteElement',
        pluginKey: 'BlockquotePlugin.key',
        route: customizerComponents.blockquoteElement.href,
        usage: 'BlockquoteElement',
      },
    ],
    id: BlockquotePlugin.key,
    label: 'Blockquote',
    npmPackage: '@sewellstephens/plate-block-quote',
    pluginFactory: 'BlockquotePlugin',
    reactImport: true,
    route: customizerPlugins.basicnodes.route,
  },
  [BoldPlugin.key]: {
    badges: [customizerBadges.leaf],
    components: [
      {
        cnImports: ['withProps'],
        id: 'bold',
        label: 'BoldLeaf',
        noImport: true,
        plateImports: ['PlateLeaf'],
        pluginKey: 'BoldPlugin.key',
        usage: `withProps(PlateLeaf, { as: 'strong' })`,
      },
    ],
    id: BoldPlugin.key,
    label: 'Bold',
    npmPackage: '@sewellstephens/plate-basic-marks',
    pluginFactory: 'BoldPlugin',
    reactImport: true,
    route: customizerPlugins.basicmarks.route,
  },
  [CaptionPlugin.key]: {
    badges: [customizerBadges.handler],
    id: CaptionPlugin.key,
    label: 'Caption',
    npmPackage: '@sewellstephens/plate-caption',
    pluginFactory: 'CaptionPlugin',
    pluginOptions: [`options: { plugins: [ImagePlugin, MediaEmbedPlugin] },`],
    reactImport: true,
    route: customizerPlugins.media.route,
  },
  [CodeBlockPlugin.key]: {
    badges: [customizerBadges.element],
    components: [
      {
        id: 'code-block-element',
        label: 'CodeBlockElement',
        pluginKey: 'CodeBlockPlugin.key',
        route: customizerComponents.codeBlockElement.href,
        usage: 'CodeBlockElement',
      },
      {
        id: 'code-line-element',
        label: 'CodeLineElement',
        pluginImports: ['CodeLinePlugin'],
        pluginKey: 'CodeLinePlugin.key',
        route: customizerComponents.codeLineElement.href,
        usage: 'CodeLineElement',
      },
      {
        id: 'code-syntax-leaf',
        label: 'CodeSyntaxLeaf',
        pluginImports: ['CodeSyntaxPlugin'],
        pluginKey: 'CodeSyntaxPlugin.key',
        route: customizerComponents.codeSyntaxLeaf.href,
        usage: 'CodeSyntaxLeaf',
      },
    ],
    id: CodeBlockPlugin.key,
    label: 'Code block',
    npmPackage: '@sewellstephens/plate-code-block',
    pluginFactory: 'CodeBlockPlugin',
    reactImport: true,
    route: customizerPlugins.basicnodes.route,
  },
  [CodeLinePlugin.key]: {
    id: CodeLinePlugin.key,
    label: 'Code Line',
    npmPackage: '@sewellstephens/plate-code-block',
    pluginFactory: 'CodeLinePlugin',
    reactImport: true,
  },
  [CodePlugin.key]: {
    badges: [customizerBadges.leaf],
    components: [
      {
        id: 'code-leaf',
        label: 'CodeLeaf',
        pluginKey: 'CodePlugin.key',
        route: customizerComponents.codeLeaf.href,
        usage: `CodeLeaf`,
      },
    ],
    id: CodePlugin.key,
    label: 'Code',
    npmPackage: '@sewellstephens/plate-basic-marks',
    pluginFactory: 'CodePlugin',
    reactImport: true,
    route: customizerPlugins.basicmarks.route,
  },
  [CodeSyntaxPlugin.key]: {
    id: CodeSyntaxPlugin.key,
    label: 'Code Syntax',
    npmPackage: '@sewellstephens/plate-code-block',
    pluginFactory: 'CodeSyntaxPlugin',
    reactImport: true,
  },
  [CommentsPlugin.key]: {
    badges: [customizerBadges.leaf],
    components: [
      {
        id: 'comment-leaf',
        label: 'CommentLeaf',
        pluginKey: 'CommentsPlugin.key',
        route: customizerComponents.commentLeaf.href,
        usage: 'CommentLeaf',
      },
      {
        id: 'comments-popover',
        label: 'CommentsPopover',
        route: customizerComponents.commentsPopover.href,
        usage: 'CommentsPopover',
      },
    ],
    id: CommentsPlugin.key,
    label: 'Comments',
    npmPackage: '@sewellstephens/plate-comments',
    pluginFactory: 'CommentsPlugin',
    reactImport: true,
    route: customizerPlugins.comment.route,
  },
  // Deserialization
  [CsvPlugin.key]: {
    badges: [customizerBadges.handler],
    id: CsvPlugin.key,
    label: 'CSV',
    npmPackage: '@sewellstephens/plate-csv',
    pluginFactory: 'CsvPlugin',
    route: customizerPlugins.csv.route,
  },
  [DatePlugin.key]: {
    badges: [customizerBadges.element],
    components: [
      {
        id: 'date-element',
        label: 'DateElement',
        pluginKey: 'DatePlugin.key',
        route: customizerComponents.dateElement.href,
        usage: 'DateElement',
      },
    ],
    id: DatePlugin.key,
    label: 'Date',
    npmPackage: '@sewellstephens/plate-date',
    pluginFactory: 'DatePlugin',
    reactImport: true,
    route: customizerPlugins.date.route,
  },
  [DeletePlugin.key]: {
    badges: [customizerBadges.handler],
    id: DeletePlugin.key,
    label: 'Delete',
    npmPackage: '@sewellstephens/plate-select',
    pluginFactory: 'DeletePlugin',
  },
  [DndPlugin.key]: {
    badges: [customizerBadges.handler, customizerBadges.ui],
    components: [
      {
        filename: 'with-draggables',
        id: 'draggable',
        label: 'Draggable',
        registry: 'draggable',
        route: customizerComponents.draggable.href,
        usage: 'withDraggables',
      },
    ],
    customImports: [
      `import { DndProvider } from 'react-dnd';`,
      `import { HTML5Backend } from 'react-dnd-html5-backend';`,
    ],
    dependencies: [NodeIdPlugin.key],
    id: DndPlugin.key,
    label: 'Drag & Drop',
    npmPackage: '@sewellstephens/plate-dnd',
    pluginFactory: 'DndPlugin',
    pluginOptions: ['  options: { enableScroller: true },'],
    route: customizerPlugins.dnd.route,
  },
  [DocxPlugin.key]: {
    badges: [customizerBadges.handler],
    dependencies: [JuicePlugin.key],
    id: DocxPlugin.key,
    label: 'DOCX',
    npmPackage: '@sewellstephens/plate-docx',
    pluginFactory: 'DocxPlugin',
    route: customizerPlugins.docx.route,
  },
  [DragOverCursorPlugin.key]: {
    badges: [customizerBadges.handler, customizerBadges.ui],
    id: DragOverCursorPlugin.key,
    // npmPackage: '@sewellstephens/plate-cursor',
    label: 'Drag Cursor',
    reactImport: true,
    route: customizerPlugins.cursoroverlay.route,
  },
  [EmojiPlugin.key]: {
    badges: [customizerBadges.handler],
    components: [
      {
        id: 'emoji-input-element',
        label: 'EmojiInputElement',
        route: customizerComponents.emojiInputElement.href,
        usage: 'EmojiInputElement',
      },
    ],
    id: EmojiPlugin.key,
    label: 'Emoji',
    npmPackage: '@sewellstephens/plate-emoji',
    pluginFactory: 'EmojiPlugin',
    reactImport: true,
    route: customizerPlugins.emoji.route,
  },
  [ExcalidrawPlugin.key]: {
    badges: [customizerBadges.element, customizerBadges.void],
    components: [
      {
        id: 'excalidraw-element',
        label: 'ExcalidrawElement',
        pluginKey: 'ExcalidrawPlugin.key',
        route: customizerComponents.excalidrawElement.href,
        usage: 'ExcalidrawElement',
      },
    ],
    id: ExcalidrawPlugin.key,
    label: 'Excalidraw',
    npmPackage: '@sewellstephens/plate-excalidraw',
    pluginFactory: 'ExcalidrawPlugin',
    reactImport: true,
    route: customizerPlugins.excalidraw.route,
  },
  [ExitBreakPlugin.key]: {
    badges: [customizerBadges.handler],
    id: ExitBreakPlugin.key,
    label: 'Exit Break',
    npmPackage: '@sewellstephens/plate-break',
    pluginFactory: 'ExitBreakPlugin',
    pluginOptions: [
      `options: {`,
      `  rules: [`,
      `    {`,
      `      hotkey: 'mod+enter',`,
      `    },`,
      `    {`,
      `      before: true,`,
      `      hotkey: 'mod+shift+enter',`,
      `    },`,
      `    {`,
      `      hotkey: 'enter',`,
      `      level: 1,`,
      `      query: {`,
      `        allow: ['h1', 'h2', 'h3'],`,
      `        end: true,`,
      `        start: true,`,
      `      },`,
      `      relative: true,`,
      `    },`,
      `  ],`,
      `},`,
    ],
    reactImport: true,
    route: customizerPlugins.exitbreak.route,
  },
  [FontBackgroundColorPlugin.key]: {
    badges: [customizerBadges.style],
    id: FontBackgroundColorPlugin.key,
    label: 'Font Background',
    npmPackage: '@sewellstephens/plate-font',
    pluginFactory: 'FontBackgroundColorPlugin',
    route: customizerPlugins.font.route,
  },
  [FontColorPlugin.key]: {
    badges: [customizerBadges.style],
    id: FontColorPlugin.key,
    label: 'Font Color',
    npmPackage: '@sewellstephens/plate-font',
    pluginFactory: 'FontColorPlugin',
    route: customizerPlugins.font.route,
  },
  [FontSizePlugin.key]: {
    badges: [customizerBadges.style],
    id: FontSizePlugin.key,
    label: 'Font Size',
    npmPackage: '@sewellstephens/plate-font',
    pluginFactory: 'FontSizePlugin',
    route: customizerPlugins.font.route,
  },
  [HighlightPlugin.key]: {
    badges: [customizerBadges.leaf],
    components: [
      {
        id: 'highlight-leaf',
        label: 'HighlightLeaf',
        pluginKey: 'HighlightPlugin.key',
        route: customizerComponents.highlightLeaf.href,
        usage: 'HighlightLeaf',
      },
    ],
    id: HighlightPlugin.key,
    label: 'Highlight',
    npmPackage: '@sewellstephens/plate-highlight',
    pluginFactory: 'HighlightPlugin',
    reactImport: true,
    route: customizerPlugins.highlight.route,
  },
  [HorizontalRulePlugin.key]: {
    badges: [customizerBadges.element, customizerBadges.void],
    components: [
      {
        id: 'hr-element',
        label: 'HrElement',
        pluginKey: 'HorizontalRulePlugin.key',
        route: customizerComponents.hrElement.href,
        usage: 'HrElement',
      },
    ],
    id: HorizontalRulePlugin.key,
    label: 'Horizontal Rule',
    npmPackage: '@sewellstephens/plate-horizontal-rule',
    pluginFactory: 'HorizontalRulePlugin',
    reactImport: true,
    route: customizerPlugins.hr.route,
  },
  [ImagePlugin.key]: {
    badges: [customizerBadges.element, customizerBadges.void],
    components: [
      {
        id: 'image-element',
        label: 'ImageElement',
        pluginKey: 'ImagePlugin.key',
        route: customizerComponents.imageElement.href,
        usage: 'ImageElement',
      },
    ],
    id: ImagePlugin.key,
    label: 'Image',
    npmPackage: '@sewellstephens/plate-media',
    pluginFactory: 'ImagePlugin',
    reactImport: true,
    route: customizerPlugins.media.route,
  },
  [IndentListPlugin.key]: {
    badges: [customizerBadges.style],
    conflicts: ['list'],
    dependencies: [IndentPlugin.key],
    id: IndentListPlugin.key,
    label: 'Indent List',
    npmPackage: '@sewellstephens/plate-indent-list',
    pluginFactory: 'IndentListPlugin',
    pluginOptions: [`inject: { targetPlugins: ['p', 'h1', 'h2', 'h3'] },`],
    reactImport: true,
    route: customizerPlugins.indentlist.route,
  },
  [IndentPlugin.key]: {
    badges: [customizerBadges.style],
    id: IndentPlugin.key,
    label: 'Indent',
    npmPackage: '@sewellstephens/plate-indent',
    pluginFactory: 'IndentPlugin',
    pluginOptions: [`inject: { targetPlugins: ['p', 'h1', 'h2', 'h3'] },`],
    reactImport: true,
    route: customizerPlugins.indent.route,
  },
  [ItalicPlugin.key]: {
    badges: [customizerBadges.leaf],
    components: [
      {
        cnImports: ['withProps'],
        id: 'italic',
        label: 'ItalicLeaf',
        noImport: true,
        plateImports: ['PlateLeaf'],
        pluginKey: 'ItalicPlugin.key',
        usage: `withProps(PlateLeaf, { as: 'em' })`,
      },
    ],
    id: ItalicPlugin.key,
    label: 'Italic',
    npmPackage: '@sewellstephens/plate-basic-marks',
    pluginFactory: 'ItalicPlugin',
    reactImport: true,
    route: customizerPlugins.basicmarks.route,
  },
  [JuicePlugin.key]: {
    badges: [customizerBadges.handler],
    id: JuicePlugin.key,
    label: 'Juice',
    npmPackage: '@sewellstephens/plate-juice',
    pluginFactory: 'JuicePlugin',
    route: customizerPlugins.docx.route,
  },
  [KbdPlugin.key]: {
    badges: [customizerBadges.leaf],
    components: [
      {
        id: 'kbd-leaf',
        label: 'KbdLeaf',
        pluginKey: 'KbdPlugin.key',
        route: customizerComponents.kbdLeaf.href,
        usage: 'KbdLeaf',
      },
    ],
    id: KbdPlugin.key,
    label: 'Keyboard Input',
    npmPackage: '@sewellstephens/plate-kbd',
    pluginFactory: 'KbdPlugin',
    reactImport: true,
    route: customizerPlugins.kbd.route,
  },
  [LineHeightPlugin.key]: {
    badges: [customizerBadges.style],
    id: LineHeightPlugin.key,
    label: 'Line Height',
    npmPackage: '@sewellstephens/plate-line-height',
    pluginFactory: 'LineHeightPlugin',
    pluginOptions: [
      `inject: {`,
      `  nodeProps: {`,
      `    defaultNodeValue: 1.5,`,
      `    validNodeValues: [1, 1.2, 1.5, 2, 3],`,
      `  },`,
      `  targetPlugins: ['p', 'h1', 'h2', 'h3'],`,
      `},`,
    ],
    route: customizerPlugins.lineheight.route,
  },
  [LinkPlugin.key]: {
    badges: [customizerBadges.element, customizerBadges.inline],
    components: [
      {
        id: 'link-element',
        label: 'LinkElement',
        pluginKey: 'LinkPlugin.key',
        route: customizerComponents.linkElement.href,
        usage: 'LinkElement',
      },
      {
        id: 'link-floating-toolbar',
        label: 'LinkFloatingToolbar',
        pluginOptions: [
          `render: { afterEditable: () => <LinkFloatingToolbar /> },`,
        ],
        route: customizerComponents.linkFloatingToolbar.href,
        usage: 'LinkFloatingToolbar',
      },
    ],
    id: LinkPlugin.key,
    label: 'Link',
    npmPackage: '@sewellstephens/plate-link',
    pluginFactory: 'LinkPlugin',
    reactImport: true,
    route: customizerPlugins.link.route,
  },
  [MarkdownPlugin.key]: {
    badges: [customizerBadges.handler],
    id: MarkdownPlugin.key,
    label: 'Deserialize MD',
    npmPackage: '@sewellstephens/plate-markdown',
    pluginFactory: 'MarkdownPlugin',
    route: customizerPlugins.markdown.route,
  },

  [MediaEmbedPlugin.key]: {
    badges: [customizerBadges.element, customizerBadges.void],
    components: [
      {
        id: 'media-embed-element',
        label: 'MediaEmbedElement',
        pluginKey: 'MediaEmbedPlugin.key',
        route: customizerComponents.mediaEmbedElement.href,
        usage: 'MediaEmbedElement',
      },
    ],
    id: MediaEmbedPlugin.key,
    label: 'Media Embed',
    npmPackage: '@sewellstephens/plate-media',
    pluginFactory: 'MediaEmbedPlugin',
    reactImport: true,
    route: customizerPlugins.media.route,
  },
  [MentionInputPlugin.key]: {
    id: MentionInputPlugin.key,
    label: 'Mention Input',
    npmPackage: '@sewellstephens/plate-mention',
    pluginFactory: 'MentionInputPlugin',
    reactImport: true,
  },
  [MentionPlugin.key]: {
    badges: [
      customizerBadges.element,
      customizerBadges.inline,
      customizerBadges.void,
    ],
    components: [
      {
        id: 'mention-element',
        label: 'MentionElement',
        pluginKey: 'MentionPlugin.key',
        route: customizerComponents.mentionElement.href,
        usage: 'MentionElement',
      },
      {
        id: 'mention-input-element',
        label: 'MentionInputElement',
        pluginImports: ['MentionInputPlugin'],
        pluginKey: 'MentionInputPlugin.key',
        route: customizerComponents.mentionInputElement.href,
        usage: 'MentionInputElement',
      },
    ],
    id: MentionPlugin.key,
    label: 'Mention',
    npmPackage: '@sewellstephens/plate-mention',
    pluginFactory: 'MentionPlugin',
    reactImport: true,
    route: customizerPlugins.mention.route,
  },
  [NodeIdPlugin.key]: {
    badges: [customizerBadges.normalizer],
    id: NodeIdPlugin.key,
    label: 'Id',
    npmPackage: '@sewellstephens/plate-node-id',
    pluginFactory: 'NodeIdPlugin',
    // route: settingValues.nodeid.route,
  },
  [NormalizeTypesPlugin.key]: {
    badges: [customizerBadges.normalizer],
    id: NormalizeTypesPlugin.key,
    label: 'Normalize Types',
    npmPackage: '@sewellstephens/plate-normalizers',
    pluginFactory: 'NormalizeTypesPlugin',
    route: customizerPlugins.forcedlayout.route,
  },
  [ParagraphPlugin.key]: {
    badges: [customizerBadges.element],
    components: [
      {
        id: 'paragraph-element',
        label: 'ParagraphElement',
        pluginKey: 'ParagraphPlugin.key',
        route: customizerComponents.paragraphElement.href,
        usage: 'ParagraphElement',
      },
    ],
    id: ParagraphPlugin.key,
    label: 'Paragraph',
    plateImports: ['ParagraphPlugin'],
    // npmPackage: '@sewellstephens/plate-common',
    pluginFactory: 'ParagraphPlugin',
    reactImport: true,
    route: customizerPlugins.basicnodes.route,
  },
  [ResetNodePlugin.key]: {
    badges: [customizerBadges.handler],
    id: ResetNodePlugin.key,
    label: 'Reset Node',
    npmPackage: '@sewellstephens/plate-reset-node',
    pluginFactory: 'ResetNodePlugin',
    pluginOptions: [
      `options: {`,
      `  rules: [`,
      `    // Usage: https://platejs.org/docs/reset-node`,
      `  ],`,
      `},`,
    ],
    reactImport: true,
    route: customizerPlugins.resetnode.route,
  },
  [SelectOnBackspacePlugin.key]: {
    badges: [customizerBadges.handler],
    id: SelectOnBackspacePlugin.key,
    label: 'Select on Backspace',
    npmPackage: '@sewellstephens/plate-select',
    pluginFactory: 'SelectOnBackspacePlugin',
    pluginOptions: [
      `options: {`,
      `  query: {`,
      `    allow: [`,
      `      // ImagePlugin.key, HorizontalRulePlugin.key`,
      `    ],`,
      `  },`,
      `},`,
    ],
    route: customizerPlugins.media.route,
  },
  [SingleLinePlugin.key]: {
    badges: [customizerBadges.normalizer],
    conflicts: [TrailingBlockPlugin.key],
    disablePlugins: [TrailingBlockPlugin.key],
    id: SingleLinePlugin.key,
    label: 'Single Line',
    npmPackage: '@sewellstephens/plate-break',
    pluginFactory: 'SingleLinePlugin',
    reactImport: true,
    route: customizerPlugins.singleline.route,
  },
  [SoftBreakPlugin.key]: {
    badges: [customizerBadges.handler],
    id: SoftBreakPlugin.key,
    label: 'Soft Break',
    npmPackage: '@sewellstephens/plate-break',
    pluginFactory: 'SoftBreakPlugin',
    pluginOptions: [
      `options: {`,
      `  rules: [`,
      `    { hotkey: 'shift+enter' },`,
      `    {`,
      `      hotkey: 'enter',`,
      `      query: {`,
      `        allow: ['code_block', 'blockquote', 'td', 'th'],`,
      `      },`,
      `    },`,
      `  ],`,
      `},`,
    ],
    reactImport: true,
    route: customizerPlugins.softbreak.route,
  },
  [StrikethroughPlugin.key]: {
    badges: [customizerBadges.leaf],
    components: [
      {
        cnImports: ['withProps'],
        id: 'strikethrough',
        label: 'StrikethroughLeaf',
        noImport: true,
        plateImports: ['PlateLeaf'],
        pluginKey: 'StrikethroughPlugin.key',
        usage: `withProps(PlateLeaf, { as: 's' })`,
      },
    ],
    id: StrikethroughPlugin.key,
    label: 'Strikethrough',
    npmPackage: '@sewellstephens/plate-basic-marks',
    pluginFactory: 'StrikethroughPlugin',
    reactImport: true,
    route: customizerPlugins.basicmarks.route,
  },
  [SubscriptPlugin.key]: {
    badges: [customizerBadges.leaf],
    components: [
      {
        cnImports: ['withProps'],
        id: 'subscript',
        label: 'SubscriptLeaf',
        noImport: true,
        plateImports: ['PlateLeaf'],
        pluginKey: 'SubscriptPlugin.key',
        usage: `withProps(PlateLeaf, { as: 'sub' })`,
      },
    ],
    id: SubscriptPlugin.key,
    label: 'Subscript',
    npmPackage: '@sewellstephens/plate-basic-marks',
    pluginFactory: 'SubscriptPlugin',
    reactImport: true,
    route: customizerPlugins.basicmarks.route,
  },
  [SuperscriptPlugin.key]: {
    badges: [customizerBadges.leaf],
    components: [
      {
        cnImports: ['withProps'],
        id: 'superscript',
        label: 'SuperscriptLeaf',
        noImport: true,
        plateImports: ['PlateLeaf'],
        pluginKey: 'SuperscriptPlugin.key',
        usage: `withProps(PlateLeaf, { as: 'sup' })`,
      },
    ],
    id: SuperscriptPlugin.key,
    label: 'Superscript',
    npmPackage: '@sewellstephens/plate-basic-marks',
    pluginFactory: 'SuperscriptPlugin',
    reactImport: true,
    route: customizerPlugins.basicmarks.route,
  },
  [TabbablePlugin.key]: {
    badges: [customizerBadges.handler],
    id: TabbablePlugin.key,
    label: 'Tabbable',
    npmPackage: '@sewellstephens/plate-tabbable',
    pluginFactory: 'TabbablePlugin',
    reactImport: true,
    route: customizerPlugins.tabbable.route,
  },
  [TablePlugin.key]: {
    badges: [customizerBadges.element],
    components: [
      {
        id: 'table-element',
        label: 'TableElement',
        pluginKey: 'TablePlugin.key',
        route: customizerComponents.tableElement.href,
        usage: 'TableElement',
      },
      {
        id: 'table-row-element',
        label: 'TableRowElement',
        pluginImports: ['TableRowPlugin'],
        pluginKey: 'TableRowPlugin.key',
        route: customizerComponents.tableRowElement.href,
        usage: 'TableRowElement',
      },
      {
        filename: 'table-cell-element',
        id: 'td',
        label: 'TableCellElement',
        pluginImports: ['TableCellPlugin'],
        pluginKey: 'TableCellPlugin.key',
        route: customizerComponents.tableCellElement.href,
        usage: 'TableCellElement',
      },
      {
        filename: 'table-cell-element',
        id: 'th',
        label: 'TableCellHeaderElement',
        pluginImports: ['TableCellHeaderPlugin'],
        pluginKey: 'TableCellHeaderPlugin.key',
        route: customizerComponents.tableCellElement.href,
        usage: 'TableCellHeaderElement',
      },
    ],
    id: TablePlugin.key,
    label: 'Table',
    npmPackage: '@sewellstephens/plate-table',
    pluginFactory: 'TablePlugin',
    reactImport: true,
    route: customizerPlugins.table.route,
  },
  [TodoListPlugin.key]: {
    badges: [customizerBadges.element],
    components: [
      {
        id: 'todo-list-element',
        label: 'TodoListElement',
        pluginKey: 'TodoListPlugin.key',
        route: customizerComponents.todoListElement.href,
        usage: 'TodoListElement',
      },
    ],
    id: TodoListPlugin.key,
    label: 'Todo List',
    npmPackage: '@sewellstephens/plate-list',
    pluginFactory: 'TodoListPlugin',
    reactImport: true,
    route: customizerPlugins.todoli.route,
  },
  [TogglePlugin.key]: {
    badges: [customizerBadges.element],
    components: [
      {
        id: 'toggle-element',
        label: 'ToggleElement',
        pluginKey: 'TogglePlugin.key',
        route: customizerComponents.toggleElement.href,
        usage: 'ToggleElement',
      },
    ],
    id: TogglePlugin.key,
    label: 'Toggle',
    npmPackage: '@sewellstephens/plate-toggle',
    pluginFactory: 'TogglePlugin',
    reactImport: true,
    route: customizerPlugins.toggle.route,
  },
  [TrailingBlockPlugin.key]: {
    badges: [customizerBadges.normalizer],
    conflicts: [SingleLinePlugin.key],
    disablePlugins: [SingleLinePlugin.key],
    id: TrailingBlockPlugin.key,
    label: 'Trailing Block',
    npmPackage: '@sewellstephens/plate-trailing-block',
    pluginFactory: 'TrailingBlockPlugin',
    pluginOptions: [`options: { type: 'p' },`],
    route: customizerPlugins.trailingblock.route,
  },
  [UnderlinePlugin.key]: {
    badges: [customizerBadges.leaf],
    components: [
      {
        cnImports: ['withProps'],
        id: 'underline',
        label: 'UnderlineLeaf',
        noImport: true,
        plateImports: ['PlateLeaf'],
        pluginKey: 'UnderlinePlugin.key',
        usage: `withProps(PlateLeaf, { as: 'u' })`,
      },
    ],
    id: UnderlinePlugin.key,
    label: 'Underline',
    npmPackage: '@sewellstephens/plate-basic-marks',
    pluginFactory: 'UnderlinePlugin',
    reactImport: true,
    route: customizerPlugins.basicmarks.route,
  },
  column: {
    badges: [customizerBadges.element],
    components: [
      {
        id: 'column-group-element',
        label: 'ColumnGroupElement',
        pluginKey: 'ColumnPlugin.key',
        route: customizerComponents.columnGroupElement.href,
        usage: 'ColumnGroupElement',
      },
      {
        id: 'column-element',
        label: 'ColumnElement',
        pluginImports: ['ColumnItemPlugin'],
        pluginKey: 'ColumnItemPlugin.key',
        route: customizerComponents.columnElement.href,
        usage: 'ColumnElement',
      },
    ],
    id: 'column',
    label: 'Column',
    npmPackage: '@sewellstephens/plate-layout',
    pluginFactory: 'ColumnPlugin',
    reactImport: true,
    route: customizerPlugins.column.route,
  },
  components: {
    badges: [customizerBadges.ui],
    components: [
      {
        id: 'editor',
        label: 'Editor',
        route: customizerComponents.editor.href,
        usage: 'Editor',
      },
      {
        id: 'fixed-toolbar',
        label: 'FixedToolbar',
        route: customizerComponents.fixedToolbar.href,
        usage: 'FixedToolbar',
      },
      {
        id: 'fixed-toolbar-buttons',
        label: 'FixedToolbarButtons',
        route: customizerComponents.fixedToolbarButtons.href,
        usage: 'FixedToolbarButtons',
      },
      {
        id: 'floating-toolbar',
        label: 'FloatingToolbar',
        route: customizerComponents.floatingToolbar.href,
        usage: 'FloatingToolbar',
      },
      {
        id: 'floating-toolbar-buttons',
        label: 'FloatingToolbarButtons',
        route: customizerComponents.floatingToolbarButtons.href,
        usage: 'FloatingToolbarButtons',
      },
      {
        id: 'placeholder',
        label: 'Placeholder',
        registry: 'placeholder',
        route: customizerComponents.placeholder.href,
        usage: 'withPlaceholders',
      },
    ],
    id: 'components',
    label: 'Components',
  },
  heading: {
    badges: [customizerBadges.element],
    components: [
      {
        cnImports: ['withProps'],
        filename: 'heading-element',
        id: 'h1',
        import: 'HeadingElement',
        label: 'H1Element',
        pluginKey: 'HEADING_KEYS.h1',
        route: customizerComponents.headingElement.href,
        usage: `withProps(HeadingElement, { variant: 'h1' })`,
      },
      {
        cnImports: ['withProps'],
        filename: 'heading-element',
        id: 'h2',
        import: 'HeadingElement',
        label: 'H2Element',
        pluginKey: 'HEADING_KEYS.h2',
        route: customizerComponents.headingElement.href,
        usage: `withProps(HeadingElement, { variant: 'h2' })`,
      },
      {
        cnImports: ['withProps'],
        filename: 'heading-element',
        id: 'h3',
        import: 'HeadingElement',
        label: 'H3Element',
        pluginKey: 'HEADING_KEYS.h3',
        route: customizerComponents.headingElement.href,
        usage: `withProps(HeadingElement, { variant: 'h3' })`,
      },
      {
        cnImports: ['withProps'],
        filename: 'heading-element',
        id: 'h4',
        import: 'HeadingElement',
        label: 'H4Element',
        pluginKey: 'HEADING_KEYS.h4',
        route: customizerComponents.headingElement.href,
        usage: `withProps(HeadingElement, { variant: 'h4' })`,
      },
      {
        cnImports: ['withProps'],
        filename: 'heading-element',
        id: 'h5',
        import: 'HeadingElement',
        label: 'H5Element',
        pluginKey: 'HEADING_KEYS.h5',
        route: customizerComponents.headingElement.href,
        usage: `withProps(HeadingElement, { variant: 'h5' })`,
      },
      {
        cnImports: ['withProps'],
        filename: 'heading-element',
        id: 'h6',
        import: 'HeadingElement',
        label: 'H6Element',
        pluginKey: 'HEADING_KEYS.h6',
        route: customizerComponents.headingElement.href,
        usage: `withProps(HeadingElement, { variant: 'h6' })`,
      },
    ],
    customImports: [`import { HEADING_KEYS } from '@sewellstephens/plate-heading';`],
    id: 'heading',
    label: 'Heading',
    npmPackage: '@sewellstephens/plate-heading',
    pluginFactory: 'HeadingPlugin',
    reactImport: true,
    route: customizerPlugins.basicnodes.route,
  },
  list: {
    badges: [customizerBadges.element],
    components: [
      {
        cnImports: ['withProps'],
        filename: 'list-element',
        id: 'ul',
        import: 'ListElement',
        label: 'BulletedListElement',
        pluginImports: ['BulletedListPlugin'],
        pluginKey: 'BulletedListPlugin.key',
        route: customizerComponents.listElement.href,
        usage: `withProps(ListElement, { variant: 'ul' })`,
      },
      {
        cnImports: ['withProps'],
        filename: 'list-element',
        id: 'ol',
        import: 'ListElement',
        label: 'NumberedListElement',
        noImport: true,
        pluginImports: ['NumberedListPlugin'],
        pluginKey: 'NumberedListPlugin.key',
        route: customizerComponents.listElement.href,
        usage: `withProps(ListElement, { variant: 'ol' })`,
      },
      {
        cnImports: ['withProps'],
        filename: 'list-element',
        id: 'li',
        label: 'ListItemElement',
        noImport: true,
        plateImports: ['PlateElement'],
        pluginImports: ['ListItemPlugin'],
        pluginKey: 'ListItemPlugin.key',
        usage: `withProps(PlateElement, { as: 'li' })`,
      },
    ],
    conflicts: [IndentListPlugin.key],
    id: 'list',
    label: 'List',
    npmPackage: '@sewellstephens/plate-list',
    pluginFactory: 'ListPlugin',
    reactImport: true,
    route: customizerPlugins.list.route,
  },
};
