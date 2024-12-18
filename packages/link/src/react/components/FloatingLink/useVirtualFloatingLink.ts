import { useEditorPlugin } from '@sewell_stephens/late-common/react';
import {
  type UseVirtualFloatingOptions,
  useVirtualFloating,
} from '@sewell_stephens/late-floating';

import { LinkPlugin } from '../../LinkPlugin';

export const useVirtualFloatingLink = ({
  editorId,
  ...floatingOptions
}: { editorId: string } & UseVirtualFloatingOptions) => {
  const { setOption } = useEditorPlugin(LinkPlugin);

  return useVirtualFloating({
    onOpenChange: (open) => setOption('openEditorId', open ? editorId : null),
    ...floatingOptions,
  });
};
