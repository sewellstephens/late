import type { TIndentElement } from '@sewell_stephens/late-indent';

import { buildToggleIndex } from '../toggleIndexAtom';

export const findElementIdsHiddenInToggle = (
  openToggleIds: Set<string>,
  elements: TIndentElement[]
): string[] => {
  const toggleIndex = buildToggleIndex(elements);

  return elements
    .filter((element) => {
      const enclosingToggleIds = toggleIndex.get(element.id as string) || [];

      return enclosingToggleIds.some(
        (toggleId) => !openToggleIds.has(toggleId)
      );
    })
    .map((element) => element.id as string);
};
