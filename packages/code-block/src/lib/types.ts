import type {
  InsertNodesOptions,
  TEditor,
  TElement,
} from '@sewell_stephens/late-common';
import type { Token, languages, tokenize } from 'prismjs';

export type Prism = {
  Token: typeof Token;
  languages: typeof languages;
  tokenize: typeof tokenize;
};

export interface TCodeBlockElement extends TElement {
  lang?: string;
}

export interface CodeBlockInsertOptions<E extends TEditor = TEditor> {
  defaultType?: string;
  insertNodesOptions?: Omit<InsertNodesOptions<E>, 'match'>;
}
