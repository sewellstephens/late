import {
  type AutoformatBlockRule,
  type AutoformatPluginOptions,
  type AutoformatRule,
  autoformatArrow,
  autoformatLegal,
  autoformatLegalHtml,
  autoformatMath,
  autoformatPunctuation,
  autoformatSmartQuotes,
} from '@sewellstephens/plate-autoformat';
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
  insertEmptyCodeBlock,
} from '@sewellstephens/plate-code-block';
import {
  ParagraphPlugin,
  type SlateEditor,
  getParentNode,
  insertNodes,
  isBlock,
  isElement,
  isType,
  setNodes,
} from '@sewellstephens/plate-common';
import { HEADING_KEYS } from '@sewellstephens/plate-heading';
import { HighlightPlugin } from '@sewellstephens/plate-highlight/react';
import { HorizontalRulePlugin } from '@sewellstephens/plate-horizontal-rule/react';
import {
  INDENT_LIST_KEYS,
  ListStyleType,
  toggleIndentList,
} from '@sewellstephens/plate-indent-list';
import {
  type TTodoListItemElement,
  toggleList,
  unwrapList,
} from '@sewellstephens/plate-list';
import {
  BulletedListPlugin,
  ListItemPlugin,
  NumberedListPlugin,
  TodoListPlugin,
} from '@sewellstephens/plate-list/react';
import { TogglePlugin, openNextToggles } from '@sewellstephens/plate-toggle/react';

export const preFormat: AutoformatBlockRule['preFormat'] = (editor) =>
  unwrapList(editor);

export const format = (editor: SlateEditor, customFormatting: any) => {
  if (editor.selection) {
    const parentEntry = getParentNode(editor, editor.selection);

    if (!parentEntry) return;

    const [node] = parentEntry;

    if (
      isElement(node) &&
      !isType(editor, node, CodeBlockPlugin.key) &&
      !isType(editor, node, CodeLinePlugin.key)
    ) {
      customFormatting();
    }
  }
};

export const formatList = (editor: SlateEditor, elementType: string) => {
  format(editor, () =>
    toggleList(editor, {
      type: elementType,
    })
  );
};

export const autoformatMarks: AutoformatRule[] = [
  {
    match: '***',
    mode: 'mark',
    type: [BoldPlugin.key, ItalicPlugin.key],
  },
  {
    match: '__*',
    mode: 'mark',
    type: [UnderlinePlugin.key, ItalicPlugin.key],
  },
  {
    match: '__**',
    mode: 'mark',
    type: [UnderlinePlugin.key, BoldPlugin.key],
  },
  {
    match: '___***',
    mode: 'mark',
    type: [UnderlinePlugin.key, BoldPlugin.key, ItalicPlugin.key],
  },
  {
    match: '**',
    mode: 'mark',
    type: BoldPlugin.key,
  },
  {
    match: '__',
    mode: 'mark',
    type: UnderlinePlugin.key,
  },
  {
    match: '*',
    mode: 'mark',
    type: ItalicPlugin.key,
  },
  {
    match: '_',
    mode: 'mark',
    type: ItalicPlugin.key,
  },
  {
    match: '~~',
    mode: 'mark',
    type: StrikethroughPlugin.key,
  },
  {
    match: '^',
    mode: 'mark',
    type: SuperscriptPlugin.key,
  },
  {
    match: '~',
    mode: 'mark',
    type: SubscriptPlugin.key,
  },
  {
    match: '==',
    mode: 'mark',
    type: HighlightPlugin.key,
  },
  {
    match: '≡',
    mode: 'mark',
    type: HighlightPlugin.key,
  },
  {
    match: '`',
    mode: 'mark',
    type: CodePlugin.key,
  },
];

export const autoformatBlocks: AutoformatRule[] = [
  {
    match: '# ',
    mode: 'block',
    preFormat,
    type: HEADING_KEYS.h1,
  },
  {
    match: '## ',
    mode: 'block',
    preFormat,
    type: HEADING_KEYS.h2,
  },
  {
    match: '### ',
    mode: 'block',
    preFormat,
    type: HEADING_KEYS.h3,
  },
  {
    match: '#### ',
    mode: 'block',
    preFormat,
    type: HEADING_KEYS.h4,
  },
  {
    match: '##### ',
    mode: 'block',
    preFormat,
    type: HEADING_KEYS.h5,
  },
  {
    match: '###### ',
    mode: 'block',
    preFormat,
    type: HEADING_KEYS.h6,
  },
  {
    match: '> ',
    mode: 'block',
    preFormat,
    type: BlockquotePlugin.key,
  },
  {
    format: (editor) => {
      insertEmptyCodeBlock(editor, {
        defaultType: ParagraphPlugin.key,
        insertNodesOptions: { select: true },
      });
    },
    match: '```',
    mode: 'block',
    preFormat,
    triggerAtBlockStart: false,
    type: CodeBlockPlugin.key,
  },
  {
    match: '+ ',
    mode: 'block',
    preFormat: openNextToggles,
    type: TogglePlugin.key,
  },
  {
    format: (editor) => {
      setNodes(editor, { type: HorizontalRulePlugin.key });
      insertNodes(editor, {
        children: [{ text: '' }],
        type: ParagraphPlugin.key,
      });
    },
    match: ['---', '—-', '___ '],
    mode: 'block',
    type: HorizontalRulePlugin.key,
  },
];

export const autoformatRules: AutoformatRule[] = [
  ...autoformatBlocks,
  ...autoformatMarks,
  ...autoformatSmartQuotes,
  ...autoformatPunctuation,
  ...autoformatLegal,
  ...autoformatLegalHtml,
  ...autoformatArrow,
  ...autoformatMath,
];

export const autoformatLists: AutoformatRule[] = [
  {
    format: (editor) => formatList(editor, BulletedListPlugin.key),
    match: ['* ', '- '],
    mode: 'block',
    preFormat,
    type: ListItemPlugin.key,
  },
  {
    format: (editor) => formatList(editor, NumberedListPlugin.key),
    match: ['^\\d+\\.$ ', '^\\d+\\)$ '],
    matchByRegex: true,
    mode: 'block',
    preFormat,
    type: ListItemPlugin.key,
  },
  {
    match: '[] ',
    mode: 'block',
    type: TodoListPlugin.key,
  },
  {
    format: (editor) =>
      setNodes<TTodoListItemElement>(
        editor,
        { checked: true, type: TodoListPlugin.key },
        {
          match: (n) => isBlock(editor, n),
        }
      ),
    match: '[x] ',
    mode: 'block',
    type: TodoListPlugin.key,
  },
];

export const autoformatIndentLists: AutoformatRule[] = [
  {
    format: (editor) => {
      toggleIndentList(editor, {
        listStyleType: ListStyleType.Disc,
      });
    },
    match: ['* ', '- '],
    mode: 'block',
    type: 'list',
  },
  {
    format: (editor) =>
      toggleIndentList(editor, {
        listStyleType: ListStyleType.Decimal,
      }),
    match: ['^\\d+\\.$ ', '^\\d+\\)$ '],
    matchByRegex: true,
    mode: 'block',
    type: 'list',
  },
  {
    format: (editor) => {
      toggleIndentList(editor, {
        listStyleType: INDENT_LIST_KEYS.todo,
      });
      setNodes(editor, {
        checked: false,
        listStyleType: INDENT_LIST_KEYS.todo,
      });
    },
    match: ['[] '],
    mode: 'block',
    type: 'list',
  },
  {
    format: (editor) => {
      toggleIndentList(editor, {
        listStyleType: INDENT_LIST_KEYS.todo,
      });
      setNodes(editor, {
        checked: true,
        listStyleType: INDENT_LIST_KEYS.todo,
      });
    },
    match: ['[x] '],
    mode: 'block',
    type: 'list',
  },
];

export const getAutoformatOptions = (
  id?: string,
  enabled?: Record<string, boolean>
): Partial<AutoformatPluginOptions> => {
  const autoformatOptions: Partial<AutoformatPluginOptions> = {
    enableUndoOnDelete: true,
    rules: [...autoformatRules],
  };

  if (id === 'indentlist') {
    autoformatOptions.rules?.push(...autoformatIndentLists);
  }

  {
    autoformatOptions.rules?.push(...autoformatLists);
  }

  if (enabled?.listStyleType) {
    autoformatOptions.rules?.push(...autoformatIndentLists);
  } else if (enabled?.list) {
    autoformatOptions.rules?.push(...autoformatLists);
  }

  return autoformatOptions;
};
