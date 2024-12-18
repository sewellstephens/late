import React from 'react';
import { AutoformatRule } from '@sewellstephens/plate-autoformat';
import { ELEMENT_BLOCKQUOTE } from '@sewellstephens/plate-block-quote';
import {
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
} from '@sewellstephens/plate-code-block';
import { TCommentText } from '@sewellstephens/plate-comments';
import {
  createLateEditor,
  CreateLateEditorOptions,
  createPluginFactory,
  createPlugins,
  createTEditor,
  Decorate,
  DecorateEntry,
  DOMHandler,
  DescendantOf,
  ElementOf,
  ElementEntryOf,
  ElementOrTextOf,
  MarksOf,
  NodeOf,
  NodeEntryOf,
  TextOf,
  TextEntryOf,
  getTEditor,
  InjectComponent,
  InjectProps,
  KeyboardHandler,
  NoInfer,
  OnChange,
  OverrideByKey,
  LateEditor,
  string,
  LatePlugin,
  LatePluginComponent,
  LatePluginInsertData,
  LatePluginProps,
  LateProps,
  PluginOptions,
  SerializeHtml,
  TElement,
  TNodeEntry,
  TReactEditor,
  TText,
  useEditorRef,
  useEditorState,
  WithOverride,
} from '@sewellstephens/plate-common';
import {
  ELEMENT_EXCALIDRAW,
  TExcalidrawElement,
} from '@sewellstephens/plate-excalidraw';
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from '@sewellstephens/plate-heading';
import { ELEMENT_HR } from '@sewellstephens/plate-horizontal-rule';
import { ELEMENT_LINK, TLinkElement } from '@sewellstephens/plate-link';
import {
  ELEMENT_LI,
  ELEMENT_OL,
  ELEMENT_TODO_LI,
  ELEMENT_UL,
  TTodoListItemElement,
} from '@sewellstephens/plate-list';
import {
  ELEMENT_IMAGE,
  ELEMENT_MEDIA_EMBED,
  TImageElement,
  TMediaEmbedElement,
} from '@sewellstephens/plate-media';
import {
  ELEMENT_MENTION,
  ELEMENT_MENTION_INPUT,
  TMentionElement,
  TMentionInputElement,
} from '@sewellstephens/plate-mention';
import { ELEMENT_PARAGRAPH } from '@sewellstephens/plate-paragraph';
import {
  ELEMENT_TABLE,
  ELEMENT_TD,
  ELEMENT_TR,
  TTableElement,
} from '@sewellstephens/plate-table';

/**
 * Text
 */

export type EmptyText = {
  text: '';
};

export type PlainText = {
  text: string;
};

export interface RichText extends TText, TCommentText {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  kbd?: boolean;
  subscript?: boolean;
  backgroundColor?: React.CSSProperties['backgroundColor'];
  fontFamily?: React.CSSProperties['fontFamily'];
  color?: React.CSSProperties['color'];
  fontSize?: React.CSSProperties['fontSize'];
  fontWeight?: React.CSSProperties['fontWeight'];
}

/**
 * Inline Elements
 */

export interface MyLinkElement extends TLinkElement {
  type: typeof ELEMENT_LINK;
  children: RichText[];
}

export interface MyMentionInputElement extends TMentionInputElement {
  type: typeof ELEMENT_MENTION_INPUT;
  children: [PlainText];
}

export interface MyMentionElement extends TMentionElement {
  type: typeof ELEMENT_MENTION;
  children: [EmptyText];
}

export type MyInlineElement =
  | MyLinkElement
  | MyMentionElement
  | MyMentionInputElement;
export type MyInlineDescendant = MyInlineElement | RichText;
export type MyInlineChildren = MyInlineDescendant[];

/**
 * Block props
 */

export interface MyIndentProps {
  indent?: number;
}

export interface MyIndentListProps extends MyIndentProps {
  listStart?: number;
  listRestart?: number;
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

/**
 * Blocks
 */

export interface MyParagraphElement extends MyBlockElement {
  type: typeof ELEMENT_PARAGRAPH;
  children: MyInlineChildren;
}

export interface MyH1Element extends MyBlockElement {
  type: typeof ELEMENT_H1;
  children: MyInlineChildren;
}

export interface MyH2Element extends MyBlockElement {
  type: typeof ELEMENT_H2;
  children: MyInlineChildren;
}

export interface MyH3Element extends MyBlockElement {
  type: typeof ELEMENT_H3;
  children: MyInlineChildren;
}

export interface MyH4Element extends MyBlockElement {
  type: typeof ELEMENT_H4;
  children: MyInlineChildren;
}

export interface MyH5Element extends MyBlockElement {
  type: typeof ELEMENT_H5;
  children: MyInlineChildren;
}

export interface MyH6Element extends MyBlockElement {
  type: typeof ELEMENT_H6;
  children: MyInlineChildren;
}

export interface MyBlockquoteElement extends MyBlockElement {
  type: typeof ELEMENT_BLOCKQUOTE;
  children: MyInlineChildren;
}

export interface MyCodeBlockElement extends MyBlockElement {
  type: typeof ELEMENT_CODE_BLOCK;
  children: MyCodeLineElement[];
}

export interface MyCodeLineElement extends TElement {
  type: typeof ELEMENT_CODE_LINE;
  children: PlainText[];
}

export interface MyTableElement extends TTableElement, MyBlockElement {
  type: typeof ELEMENT_TABLE;
  children: MyTableRowElement[];
}

export interface MyTableRowElement extends TElement {
  type: typeof ELEMENT_TR;
  children: MyTableCellElement[];
}

export interface MyTableCellElement extends TElement {
  type: typeof ELEMENT_TD;
  children: MyNestableBlock[];
}

export interface MyBulletedListElement extends TElement, MyBlockElement {
  type: typeof ELEMENT_UL;
  children: MyListItemElement[];
}

export interface MyNumberedListElement extends TElement, MyBlockElement {
  type: typeof ELEMENT_OL;
  children: MyListItemElement[];
}

export interface MyListItemElement extends TElement, MyBlockElement {
  type: typeof ELEMENT_LI;
  children: MyInlineChildren;
}

export interface MyTodoListElement
  extends TTodoListItemElement,
    MyBlockElement {
  type: typeof ELEMENT_TODO_LI;
  children: MyInlineChildren;
}

export interface MyImageElement extends TImageElement, MyBlockElement {
  type: typeof ELEMENT_IMAGE;
  children: [EmptyText];
}

export interface MyMediaEmbedElement
  extends TMediaEmbedElement,
    MyBlockElement {
  type: typeof ELEMENT_MEDIA_EMBED;
  children: [EmptyText];
}

export interface MyHrElement extends MyBlockElement {
  type: typeof ELEMENT_HR;
  children: [EmptyText];
}

export interface MyExcalidrawElement
  extends TExcalidrawElement,
    MyBlockElement {
  type: typeof ELEMENT_EXCALIDRAW;
  children: [EmptyText];
}

export type MyNestableBlock = MyParagraphElement;

export type MyBlock = Exclude<MyElement, MyInlineElement>;
export type MyBlockEntry = TNodeEntry<MyBlock>;

export type MyRootBlock =
  | MyParagraphElement
  | MyH1Element
  | MyH2Element
  | MyH3Element
  | MyH4Element
  | MyH5Element
  | MyH6Element
  | MyBlockquoteElement
  | MyCodeBlockElement
  | MyTableElement
  | MyBulletedListElement
  | MyNumberedListElement
  | MyTodoListElement
  | MyImageElement
  | MyMediaEmbedElement
  | MyHrElement
  | MyExcalidrawElement;

export type MyValue = MyRootBlock[];

/**
 * Editor types
 */

export type MyEditor = TLateEditor<MyValue> & { isDragging?: boolean };
export type MyReactEditor = TReactEditor<MyValue>;
export type MyNode = NodeOf<MyValue>;
export type MyNodeEntry = NodeEntryOf<MyValue>;
export type MyElement = ElementOf<MyValue>;
export type MyElementEntry = ElementEntryOf<MyValue>;
export type MyText = TextOf<MyValue>;
export type MyTextEntry = TextEntryOf<MyValue>;
export type MyElementOrText = ElementOrTextOf<MyValue>;
export type MyDescendant = DescendantOf<MyValue>;
export type MyMarks = MarksOf<MyValue>;
export type MyMark = keyof MyMarks;

/**
 * Late types
 */

export type MyDecorate<P = PluginOptions> = Decorate<P, MyValue, MyEditor>;
export type MyDecorateEntry = DecorateEntry<MyValue>;
export type MyDOMHandler<P = PluginOptions> = DOMHandler<P, MyValue, MyEditor>;
export type MyInjectComponent = InjectComponent<MyValue>;
export type MyInjectProps = InjectProps<MyValue>;
export type MyKeyboardHandler<P = PluginOptions> = KeyboardHandler<
  P,
  MyValue,
  MyEditor
>;
export type MyOnChange<P = PluginOptions> = OnChange<P, MyValue, MyEditor>;
export type MyOverrideByKey = OverrideByKey<MyValue, MyEditor>;
export type MyLatePlugin<P = PluginOptions> = LatePlugin<
  P,
  MyValue,
  MyEditor
>;
export type MyLatePluginInsertData = LatePluginInsertData<MyValue>;
export type MyLatePluginProps = LatePluginProps<MyValue>;
export type MyLateProps = LateProps<MyValue, MyEditor>;
export type MySerializeHtml = SerializeHtml<MyValue>;
export type MyWithOverride<P = PluginOptions> = WithOverride<
  P,
  MyValue,
  MyEditor
>;

/**
 * Late store, Slate context
 */

export const getMyEditor = (editor: MyEditor) =>
  getTEditor<MyValue, MyEditor>(editor);
export const useMyEditorRef = () => useEditorRef<MyValue, MyEditor>();
export const useMyEditorState = () => useEditorState<MyValue, MyEditor>();

/**
 * Utils
 */
export const createMyEditor = () => createTEditor() as MyEditor;
export const createMyLateEditor = (
  options: CreateLateEditorOptions<MyValue, MyEditor> = {}
) => createLateEditor<MyValue, MyEditor>(options);
export const createMyPluginFactory = <P = PluginOptions>(
  defaultPlugin: LatePlugin<NoInfer<P>, MyValue, MyEditor>
) => createPluginFactory(defaultPlugin);
export const createMyPlugins = (
  plugins: LatePlugin[],
  options?: {
    components?: Record<string, LatePluginComponent>;
    overrideByKey?: OverrideByKey;
  }
) => createPlugins<MyValue, MyEditor>(plugins, options);

export type MyAutoformatRule = AutoformatRule<MyValue, MyEditor>;
