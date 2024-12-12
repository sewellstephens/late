import {
  type TElement,
  getBlockAbove,
  isCollapsed,
} from '@sewellstephens/plate-common';
import {
  focusEditor,
  useEditorRef,
  useEditorSelector,
} from '@sewellstephens/plate-common/react';

import { LineHeightPlugin, setLineHeight } from '../../index';

export const useLineHeightDropdownMenuState = () => {
  const editor = useEditorRef();
  const { defaultNodeValue, validNodeValues: values = [] } =
    editor.getInjectProps(LineHeightPlugin);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const value: string | undefined = useEditorSelector((editor) => {
    if (isCollapsed(editor.selection)) {
      const entry = getBlockAbove<TElement>(editor);

      if (entry) {
        return (
          values.find((item) => item === entry[0][LineHeightPlugin.key]) ??
          defaultNodeValue
        );
      }
    }
  }, []);

  return {
    value,
    values,
  };
};

export const useLineHeightDropdownMenu = ({
  value,
}: ReturnType<typeof useLineHeightDropdownMenuState>) => {
  const editor = useEditorRef();

  return {
    radioGroupProps: {
      onValueChange: (newValue: string) => {
        setLineHeight(editor, {
          value: Number(newValue),
        });
        focusEditor(editor);
      },
      value,
    },
  };
};
