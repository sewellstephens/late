import type { TNode, TPath } from '@sewell_stephens/late-common';

export type TabDestinationPath = {
  path: TPath;
  type: 'path';
};

export type TabDestinationDOMNode = {
  domNode: HTMLElement;
  type: 'dom-node';
};

export type TabDestination = TabDestinationDOMNode | TabDestinationPath;

export type TabbableEntry = {
  domNode: HTMLElement;
  path: TPath;
  slateNode: TNode;
};
