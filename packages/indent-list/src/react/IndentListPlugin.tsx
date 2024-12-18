import type { ExtendConfig } from '@sewellstephens/plate-common';

import {
  type LateRenderElementProps,
  toTLatePlugin,
} from '@sewellstephens/plate-common/react';

import {
  type IndentListConfig as BaseIndentListConfig,
  IndentListPlugin as BaseIndentListPlugin,
} from '../lib';
import { onKeyDownIndentList } from './onKeyDownIndentList';
import { renderIndentListBelowNodes } from './renderIndentListBelowNodes';

export type IndentListConfig = ExtendConfig<
  BaseIndentListConfig,
  {
    listStyleTypes?: Record<
      string,
      {
        isOrdered?: boolean;
        liComponent?: React.FC<LateRenderElementProps>;
        markerComponent?: React.FC<Omit<LateRenderElementProps, 'children'>>;
        type: string;
      }
    >;
  }
>;

/** Enables support for indented lists with React-specific features. */
export const IndentListPlugin = toTLatePlugin<IndentListConfig>(
  BaseIndentListPlugin,
  {
    handlers: {
      onKeyDown: onKeyDownIndentList,
    },
    render: {
      belowNodes: renderIndentListBelowNodes,
    },
  }
);
