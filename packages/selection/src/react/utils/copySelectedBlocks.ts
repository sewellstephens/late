import {
  type SlateEditor,
  deselect,
  getEditorPlugin,
  getEndPoint,
  getStartPoint,
  select,
  withoutNormalizing,
} from '@sewell_stephens/late-common';
import copyToClipboard from 'copy-to-clipboard';

import { BlockSelectionPlugin } from '../BlockSelectionPlugin';

export const copySelectedBlocks = (editor: SlateEditor) => {
  const { api, getOptions, setOption } = getEditorPlugin(
    editor,
    BlockSelectionPlugin
  );

  const { selectedIds } = getOptions();
  const selectedEntries = api.blockSelection.getSelectedBlocks();
  const selectedFragment = selectedEntries.map(([node]) => node);

  copyToClipboard(' ', {
    onCopy: (dataTransfer) => {
      const data = dataTransfer as DataTransfer;

      if (!data) return;

      let textPlain = '';
      const div = document.createElement('div');

      withoutNormalizing(editor, () => {
        selectedEntries.forEach(([, path]) => {
          // select block by block
          select(editor, {
            anchor: getStartPoint(editor, path),
            focus: getEndPoint(editor, path),
          });

          // set data from selection
          editor.setFragmentData(data);

          // get plain text
          textPlain += `${data.getData('text/plain')}\n`;

          // get html text
          const divChild = document.createElement('div');
          divChild.innerHTML = data.getData('text/html');
          div.append(divChild);
        });

        // deselect and select back selectedIds
        deselect(editor);
        setOption('selectedIds', selectedIds);
      });

      data.setData('text/plain', textPlain);
      data.setData('text/html', div.innerHTML);

      // set slate fragment
      const selectedFragmentStr = JSON.stringify(selectedFragment);
      const encodedFragment = window.btoa(
        encodeURIComponent(selectedFragmentStr)
      );
      data.setData('application/x-slate-fragment', encodedFragment);
    },
  });
};
