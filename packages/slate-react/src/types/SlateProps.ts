import type React from 'react';

import type { TSelection, Value } from '@sewellstephens/slate';
import type { UnknownObject } from '@sewellstephens/utils';
import type { ReactEditor } from 'slate-react';

export interface SlateProps extends UnknownObject {
  children: React.ReactNode;
  editor: ReactEditor;
  initialValue: Value;
  onChange?: (value: Value) => void;
  onSelectionChange?: (selection: TSelection) => void;
  onValueChange?: (value: Value) => void;
}
