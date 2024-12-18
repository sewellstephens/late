import React from 'react';

import { getNodeString } from '@sewell_stephens/late-common';
import { useElement } from '@sewell_stephens/late-common/react';

import type { TCaptionElement } from '../../lib';

export const useCaptionString = () => {
  const { caption: nodeCaption = [{ children: [{ text: '' }] }] } =
    useElement<TCaptionElement>();

  return React.useMemo(() => {
    return getNodeString(nodeCaption[0] as any) || '';
  }, [nodeCaption]);
};
