import type { TText } from '@sewell_stephens/slate';
import type { Modify } from '@sewell_stephens/utils';
import type { RenderLeafProps } from 'slate-react';

export type TRenderLeafProps<N extends TText = TText> = Modify<
  RenderLeafProps,
  {
    leaf: N;
    text: N;
  }
>;

export type RenderLeafFn = (props: TRenderLeafProps) => React.ReactElement;
