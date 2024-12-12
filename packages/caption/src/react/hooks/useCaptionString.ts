import React from 'react';

import { getNodeString } from '@sewellstephens/plate-common';
import { useElement } from '@sewellstephens/plate-common/react';

import type { TCaptionElement } from '../../lib';

export const useCaptionString = () => {
  const { caption: nodeCaption = [{ children: [{ text: '' }] }] } =
    useElement<TCaptionElement>();

  return React.useMemo(() => {
    return getNodeString(nodeCaption[0] as any) || '';
  }, [nodeCaption]);
};
