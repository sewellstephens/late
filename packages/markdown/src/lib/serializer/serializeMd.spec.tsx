/** @jsx jsx */

import { createSlateEditor } from '@sewell_stephens/late-common';
import { jsx } from '@sewell_stephens/late-test-utils';

import { editorValueMock } from './__tests__/data';
import { serializeMd } from './serializeMd';

jsx;

describe('deserializeMd', () => {
  const editor = createSlateEditor();

  it('should serialize editor value', () => {
    editor.children = editorValueMock;
    const serializedMd = serializeMd(editor, {
      customNodes: {
        color: {
          isLeaf: true,
          serialize: (children, node) => {
            return `<span style="color:${node.color}">${children}</span>`;
          },
        },
        mention: {
          isVoid: true,
          serialize: (_, node) => `@${node.value}`,
        },
        metadata: {
          skip: true,
        },
      },
      markFormats: {
        underline: ['<u>', '</u>'],
      },

      nodes: {
        h5: {
          enabled: false,
        },
        h6: {
          skip: true,
        },
      },
    });
    expect(serializedMd).toMatchSnapshot();
  });

  // it('should serialize nodes', () => {
  //   const serializedMd = serializeMdNodes(editorValueMock as any);
  //   expect(serializedMd).toMatchSnapshot();
  // });
});
