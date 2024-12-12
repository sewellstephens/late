import type { ExtendEditor, PlateEditor } from '@sewellstephens/plate-common/react';

import type { ListConfig } from '../lib/ListPlugin';

import { withDeleteForwardList } from '../lib/withDeleteForwardList';
import { withDeleteFragmentList } from '../lib/withDeleteFragmentList';
import { withInsertFragmentList } from '../lib/withInsertFragmentList';
import { withNormalizeList } from '../lib/withNormalizeList';
import { withDeleteBackwardList } from './withDeleteBackwardList';
import { withInsertBreakList } from './withInsertBreakList';

export const withList: ExtendEditor<ListConfig> = ({ editor, ...ctx }) => {
  editor = withInsertBreakList({ editor, ...ctx });
  editor = withDeleteBackwardList({ editor, ...ctx });
  editor = withDeleteForwardList({ editor, ...ctx } as any) as PlateEditor;
  editor = withDeleteFragmentList({ editor, ...ctx } as any) as PlateEditor;
  editor = withInsertFragmentList({ editor, ...ctx } as any) as PlateEditor;
  editor = withNormalizeList({ editor, ...ctx } as any) as PlateEditor;

  return editor;
};
