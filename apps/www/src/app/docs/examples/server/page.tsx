import type { TCodeBlockElement } from '@sewell_stephens/late-code-block';
import type { TElement } from '@sewell_stephens/late-common';

import {
  AlignPlugin,
  AutoformatPlugin,
  BlockquotePlugin,
  BoldPlugin,
  CodeBlockPlugin,
  CodePlugin,
  ColumnPlugin,
  CommentsPlugin,
  DeletePlugin,
  DocxPlugin,
  FontBackgroundColorPlugin,
  FontColorPlugin,
  FontSizePlugin,
  HEADING_KEYS,
  HeadingPlugin,
  HighlightPlugin,
  HorizontalRulePlugin,
  ImagePlugin,
  IndentListPlugin,
  IndentPlugin,
  ItalicPlugin,
  KbdPlugin,
  LineHeightPlugin,
  LinkPlugin,
  ListPlugin,
  MediaEmbedPlugin,
  MentionPlugin,
  NodeIdPlugin,
  NormalizeTypesPlugin,
  ParagraphPlugin,
  SelectOnBackspacePlugin,
  SingleLinePlugin,
  SlashPlugin,
  SoftBreakPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  TabbablePlugin,
  TablePlugin,
  TodoListPlugin,
  TogglePlugin,
  TrailingBlockPlugin,
  UnderlinePlugin,
  createSlateEditor,
} from '@sewell_stephens/late';
import { ExitBreakPlugin } from '@sewell_stephens/late-break';
import { CaptionPlugin } from '@sewell_stephens/late-caption';
import { EmojiPlugin } from '@sewell_stephens/late-emoji';
import { ExcalidrawPlugin } from '@sewell_stephens/late-excalidraw';
import { JuicePlugin } from '@sewell_stephens/late-juice';
import { MarkdownPlugin } from '@sewell_stephens/late-markdown';
import { ResetNodePlugin } from '@sewell_stephens/late-reset-node';

import { Markdown } from '@/components/MemoizedReactMarkdownClient';
import { Code } from '@/components/code';
import { DocPageLayout } from '@/components/doc-page-layout';
import { Link } from '@/components/link';
import { H2, H3, P } from '@/components/typography';
import { basicElementsValue } from '@/plate/demo/values/basicElementsValue';
import { basicMarksValue } from '@/plate/demo/values/basicMarksValue';

export default function RSCPage() {
  const mockDoc = {
    description: 'Use Late in server environment',
    title: 'Server-Side',
    // ... other necessary properties
  };

  const editor = createSlateEditor({
    plugins: [
      HeadingPlugin,
      BlockquotePlugin,
      CodeBlockPlugin,
      HorizontalRulePlugin,
      LinkPlugin,
      ListPlugin,
      ImagePlugin,
      MediaEmbedPlugin,
      CaptionPlugin.configure({
        options: {
          plugins: [ImagePlugin, MediaEmbedPlugin],
        },
      }),
      MentionPlugin,
      SlashPlugin,
      TablePlugin,
      TodoListPlugin,
      TogglePlugin,
      ExcalidrawPlugin,

      // Marks
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      StrikethroughPlugin,
      CodePlugin,
      SubscriptPlugin,
      SuperscriptPlugin,
      FontColorPlugin,
      FontBackgroundColorPlugin,
      FontSizePlugin,
      HighlightPlugin,
      KbdPlugin,

      // Block Style
      AlignPlugin.extend({
        inject: {
          targetPlugins: [
            ParagraphPlugin.key,
            MediaEmbedPlugin.key,
            HEADING_KEYS.h1,
            HEADING_KEYS.h2,
            HEADING_KEYS.h3,
            HEADING_KEYS.h4,
            HEADING_KEYS.h5,
            ImagePlugin.key,
            HEADING_KEYS.h6,
          ],
        },
      }),
      IndentPlugin.extend({
        inject: {
          targetPlugins: [
            ParagraphPlugin.key,
            HEADING_KEYS.h1,
            HEADING_KEYS.h2,
            HEADING_KEYS.h3,
            HEADING_KEYS.h4,
            HEADING_KEYS.h5,
            HEADING_KEYS.h6,
            BlockquotePlugin.key,
            CodeBlockPlugin.key,
            TogglePlugin.key,
          ],
        },
      }),
      IndentListPlugin.extend({
        inject: {
          targetPlugins: [
            ParagraphPlugin.key,
            HEADING_KEYS.h1,
            HEADING_KEYS.h2,
            HEADING_KEYS.h3,
            HEADING_KEYS.h4,
            HEADING_KEYS.h5,
            HEADING_KEYS.h6,
            BlockquotePlugin.key,
            CodeBlockPlugin.key,
            TogglePlugin.key,
          ],
        },
        options: {
          listStyleTypes: {
            fire: {
              type: 'fire',
            },
            todo: {
              type: 'todo',
            },
          },
        },
      }),
      LineHeightPlugin.extend({
        inject: {
          nodeProps: {
            defaultNodeValue: 1.5,
            validNodeValues: [1, 1.2, 1.5, 2, 3],
          },
          targetPlugins: [
            ParagraphPlugin.key,
            HEADING_KEYS.h1,
            HEADING_KEYS.h2,
            HEADING_KEYS.h3,
            HEADING_KEYS.h4,
            HEADING_KEYS.h5,
            HEADING_KEYS.h6,
          ],
        },
      }),

      // Functionality
      AutoformatPlugin,
      EmojiPlugin,
      ExitBreakPlugin,
      NodeIdPlugin,
      NormalizeTypesPlugin.configure({
        options: {
          rules: [{ path: [0], strictType: HEADING_KEYS.h1 }],
        },
      }),
      ResetNodePlugin,
      SelectOnBackspacePlugin.configure({
        options: {
          query: {
            allow: [ImagePlugin.key, HorizontalRulePlugin.key],
          },
        },
      }),
      DeletePlugin,
      SingleLinePlugin,
      SoftBreakPlugin,
      TabbablePlugin,
      TrailingBlockPlugin.configure({ options: { type: ParagraphPlugin.key } }),

      // Collaboration
      CommentsPlugin,

      // Deserialization
      DocxPlugin,
      MarkdownPlugin,
      JuicePlugin,
      ColumnPlugin,
    ],
    value: [...basicElementsValue, ...basicMarksValue],
  });

  const md = editor.api.markdown.serialize({
    nodes: {
      code_block: {
        serialize: (_, node) => {
          const codeLines = node.children
            .filter((child) => (child as any).type === 'code_line')
            .map((child) =>
              (child as any).children.map((c: TElement) => c.text).join('')
            )
            .join('\n');

          return `\`\`\`${(node as any as TCodeBlockElement).lang || ''}\n${codeLines}\n\`\`\``;
        },
      },
    },
  });

  return (
    <DocPageLayout doc={mockDoc} isUI={false} toc={[]}>
      <H2>Using Late in a Server Environment</H2>
      <P>
        Late can be utilized in server-side environments, enabling operations
        like content manipulation without a browser. This is particularly useful
        for scenarios such as generating static content, processing editor
        content on the server, or working with React Server Components.
      </P>

      <H3>Creating a Server-Side Editor</H3>
      <P>
        To use Late on the server, you can leverage the{' '}
        <Code>createSlateEditor</Code>
        function. This allows you to create and manipulate Slate documents
        without a DOM environment.
      </P>

      <H3>Example: Generating Markdown in a React Server Component</H3>
      <P className="mb-8">
        Here's the output of Late{' '}
        <Link href="/docs/markdown">
          generating Markdown from a Slate value
        </Link>{' '}
        within a React Server Component:
      </P>

      <Markdown>{md}</Markdown>
    </DocPageLayout>
  );
}
