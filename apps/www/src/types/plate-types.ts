import type React from 'react';

import type { usePlaygroundEditor } from '@/registry/default/example/playground-demo';
import type { BlockquotePlugin } from '@sewellstephens/plate-block-quote/react';
import type {
  CodeBlockPlugin,
  CodeLinePlugin,
} from '@sewellstephens/plate-code-block';
import type { TCommentText } from '@sewellstephens/plate-comments';
import type {
  ElementOf,
  ParagraphPlugin,
  TElement,
  TText,
} from '@sewellstephens/plate-common';
import type { TExcalidrawElement } from '@sewellstephens/plate-excalidraw';
import type { ExcalidrawPlugin } from '@sewellstephens/plate-excalidraw/react';
import type { HEADING_KEYS } from '@sewellstephens/plate-heading';
import type { HorizontalRulePlugin } from '@sewellstephens/plate-horizontal-rule/react';
import type { TLinkElement } from '@sewellstephens/plate-link';
import type { LinkPlugin } from '@sewellstephens/plate-link/react';
import type { TTodoListItemElement } from '@sewellstephens/plate-list';
import type {
  BulletedListPlugin,
  ListItemPlugin,
  NumberedListPlugin,
  TodoListPlugin,
} from '@sewellstephens/plate-list/react';
import type { TImageElement, TMediaEmbedElement } from '@sewellstephens/plate-media';
import type { ImagePlugin, MediaEmbedPlugin } from '@sewellstephens/plate-media/react';
import type {
  TMentionElement,
  TMentionInputElement,
} from '@sewellstephens/plate-mention';
import type {
  MentionInputPlugin,
  MentionPlugin,
} from '@sewellstephens/plate-mention/react';
import type { TTableElement } from '@sewellstephens/plate-table';
import type {
  TableCellPlugin,
  TablePlugin,
  TableRowPlugin,
} from '@sewellstephens/plate-table/react';
import type { TToggleElement } from '@sewellstephens/plate-toggle';
import type { TogglePlugin } from '@sewellstephens/plate-toggle/react';

import { useEditorRef } from '@sewellstephens/plate-common/react';

/** Text */

export type EmptyText = {
  text: '';
};

export type PlainText = {
  text: string;
};

export interface RichText extends TText, TCommentText {
  backgroundColor?: React.CSSProperties['backgroundColor'];
  bold?: boolean;
  code?: boolean;
  color?: React.CSSProperties['color'];
  fontFamily?: React.CSSProperties['fontFamily'];
  fontSize?: React.CSSProperties['fontSize'];
  fontWeight?: React.CSSProperties['fontWeight'];
  italic?: boolean;
  kbd?: boolean;
  strikethrough?: boolean;
  subscript?: boolean;
  underline?: boolean;
}

/** Inline Elements */

export interface MyLinkElement extends TLinkElement {
  children: RichText[];
  type: typeof LinkPlugin.key;
}

export interface MyMentionInputElement extends TMentionInputElement {
  children: [PlainText];
  type: typeof MentionInputPlugin.key;
}

export interface MyMentionElement extends TMentionElement {
  children: [EmptyText];
  type: typeof MentionPlugin.key;
}

export type MyInlineElement =
  | MyLinkElement
  | MyMentionElement
  | MyMentionInputElement;

export type MyInlineDescendant = MyInlineElement | RichText;

export type MyInlineChildren = MyInlineDescendant[];

/** Block props */

export interface MyIndentProps {
  indent?: number;
}

export interface MyIndentListProps extends MyIndentProps {
  listRestart?: number;
  listStart?: number;
  listStyleType?: string;
}

export interface MyLineHeightProps {
  lineHeight?: React.CSSProperties['lineHeight'];
}

export interface MyAlignProps {
  align?: React.CSSProperties['textAlign'];
}

export interface MyBlockElement
  extends TElement,
    MyIndentListProps,
    MyLineHeightProps {
  id?: string;
}

/** Blocks */

export interface MyParagraphElement extends MyBlockElement {
  children: MyInlineChildren;
  type: typeof ParagraphPlugin.key;
}

export interface MyH1Element extends MyBlockElement {
  children: MyInlineChildren;
  type: typeof HEADING_KEYS.h1;
}

export interface MyH2Element extends MyBlockElement {
  children: MyInlineChildren;
  type: typeof HEADING_KEYS.h2;
}

export interface MyH3Element extends MyBlockElement {
  children: MyInlineChildren;
  type: typeof HEADING_KEYS.h3;
}

export interface MyH4Element extends MyBlockElement {
  children: MyInlineChildren;
  type: typeof HEADING_KEYS.h4;
}

export interface MyH5Element extends MyBlockElement {
  children: MyInlineChildren;
  type: typeof HEADING_KEYS.h5;
}

export interface MyH6Element extends MyBlockElement {
  children: MyInlineChildren;
  type: typeof HEADING_KEYS.h6;
}

export interface MyBlockquoteElement extends MyBlockElement {
  children: MyInlineChildren;
  type: typeof BlockquotePlugin.key;
}

export interface MyCodeBlockElement extends MyBlockElement {
  children: MyCodeLineElement[];
  type: typeof CodeBlockPlugin.key;
}

export interface MyCodeLineElement extends TElement {
  children: PlainText[];
  type: typeof CodeLinePlugin.key;
}

export interface MyTableElement extends TTableElement, MyBlockElement {
  children: MyTableRowElement[];
  type: typeof TablePlugin.key;
}

export interface MyTableRowElement extends TElement {
  children: MyTableCellElement[];
  type: typeof TableRowPlugin.key;
}

export interface MyTableCellElement extends TElement {
  children: MyNestableBlock[];
  type: typeof TableCellPlugin.key;
}

export interface MyBulletedListElement extends TElement, MyBlockElement {
  children: MyListItemElement[];
  type: typeof BulletedListPlugin.key;
}

export interface MyNumberedListElement extends TElement, MyBlockElement {
  children: MyListItemElement[];
  type: typeof NumberedListPlugin.key;
}

export interface MyListItemElement extends TElement, MyBlockElement {
  children: MyInlineChildren;
  type: typeof ListItemPlugin.key;
}

export interface MyTodoListElement
  extends TTodoListItemElement,
    MyBlockElement {
  children: MyInlineChildren;
  type: typeof TodoListPlugin.key;
}

export interface MyToggleElement extends TToggleElement, MyBlockElement {
  children: MyInlineChildren;
  type: typeof TogglePlugin.key;
}

export interface MyImageElement extends TImageElement, MyBlockElement {
  children: [EmptyText];
  type: typeof ImagePlugin.key;
}

export interface MyMediaEmbedElement
  extends TMediaEmbedElement,
    MyBlockElement {
  children: [EmptyText];
  type: typeof MediaEmbedPlugin.key;
}

export interface MyHrElement extends MyBlockElement {
  children: [EmptyText];
  type: typeof HorizontalRulePlugin.key;
}

export interface MyExcalidrawElement
  extends TExcalidrawElement,
    MyBlockElement {
  children: [EmptyText];
  type: typeof ExcalidrawPlugin.key;
}

export type MyNestableBlock = MyParagraphElement;

export type MyElement = ElementOf<MyEditor>;

export type MyBlock = Exclude<MyElement, MyInlineElement>;

export type MyRootBlock =
  | MyBlockquoteElement
  | MyBulletedListElement
  | MyCodeBlockElement
  | MyExcalidrawElement
  | MyH1Element
  | MyH2Element
  | MyH3Element
  | MyH4Element
  | MyH5Element
  | MyH6Element
  | MyHrElement
  | MyImageElement
  | MyMediaEmbedElement
  | MyNumberedListElement
  | MyParagraphElement
  | MyTableElement
  | MyTodoListElement
  | MyToggleElement;

/** Editor types */

export type MyValue = MyRootBlock[];

export type MyEditor = ReturnType<typeof usePlaygroundEditor>;

export const useMyEditorRef = () => useEditorRef<MyEditor>();
