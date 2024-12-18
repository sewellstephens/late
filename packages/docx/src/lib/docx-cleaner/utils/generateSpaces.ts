import { SPACE, TAB } from '@sewell_stephens/late-common';

export const generateSpaces = (count: number): string =>
  Array.from({ length: count }, () => SPACE).join('');

export const generateTabs = (count: number): string =>
  Array.from({ length: count }, () => TAB).join('');
