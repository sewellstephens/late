import {
  type SetNodesOptions,
  type SlateEditor,
  setNodes,
} from '@sewell_stephens/late-common';

type props = {
  isUpload?: boolean;
  name?: string;
  type: string;
  url: string;
  width?: number;
};

export const setMediaNode = (
  editor: SlateEditor,
  props: props,
  options?: SetNodesOptions
) => setNodes(editor, props, options);
