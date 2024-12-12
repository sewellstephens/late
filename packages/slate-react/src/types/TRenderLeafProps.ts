import type { TText } from '@sewellstephens/slate';
import type { Modify } from '@sewellstephens/utils';
import type { RenderLeafProps } from 'slate-react';

export type TRenderLeafProps<N extends TText = TText> = Modify<
  RenderLeafProps,
  {
    leaf: N;
    text: N;
  }
>;

export type RenderLeafFn = (props: TRenderLeafProps) => React.ReactElement;
