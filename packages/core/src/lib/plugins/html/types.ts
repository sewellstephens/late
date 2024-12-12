import type { TDescendant } from '@sewellstephens/slate';

export type DeserializeHtmlChildren = ChildNode | TDescendant | null | string;

/** De */
export type DeserializeHtmlNodeReturnType =
  | DeserializeHtmlChildren[]
  | TDescendant
  | TDescendant[]
  | null
  | string;
