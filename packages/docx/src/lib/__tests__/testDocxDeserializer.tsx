/** @jsx jsx */

import { AlignPlugin } from '@sewellstephens/plate-alignment';
import { BasicElementsPlugin } from '@sewellstephens/plate-basic-elements';
import { BasicMarksPlugin } from '@sewellstephens/plate-basic-marks';
import {
  type SlatePlugin,
  type SlatePlugins,
  createSlateEditor,
} from '@sewellstephens/plate-common';
import { ParagraphPlugin } from '@sewellstephens/plate-common';
import { HEADING_KEYS } from '@sewellstephens/plate-heading';
import { HorizontalRulePlugin } from '@sewellstephens/plate-horizontal-rule';
import { IndentPlugin } from '@sewellstephens/plate-indent';
import { JuicePlugin } from '@sewellstephens/plate-juice';
import { LineHeightPlugin } from '@sewellstephens/plate-line-height';
import { LinkPlugin } from '@sewellstephens/plate-link';
import { ImagePlugin } from '@sewellstephens/plate-media';
import { TablePlugin } from '@sewellstephens/plate-table';
import { jsx } from '@sewellstephens/plate-test-utils';

import { DocxPlugin } from '../DocxPlugin';
import { readTestFile } from './readTestFile';

jsx;

const injectConfig = {
  inject: {
    targetPlugins: [
      ParagraphPlugin.key,
      HEADING_KEYS.h1,
      HEADING_KEYS.h2,
      HEADING_KEYS.h3,
    ],
  },
};

export const createClipboardData = (html: string, rtf?: string): DataTransfer =>
  ({
    getData: (format: string) => (format === 'text/html' ? html : rtf),
  }) as any;

export const getDocxTestName = (name: string) => `when pasting docx ${name}`;

export const testDocxDeserializer = ({
  expected,
  filename,
  input = (
    <editor>
      <hp>
        <cursor />
      </hp>
    </editor>
  ),
  overridePlugins,
  plugins = [],
}: {
  expected: any;
  filename: string;
  input?: any;
  overridePlugins?: SlatePlugin['override']['plugins'];
  plugins?: SlatePlugins;
}) => {
  it('should deserialize', () => {
    const actual = createSlateEditor({
      editor: input,
      override: {
        plugins: overridePlugins,
      },
      plugins: [
        ...plugins,
        ImagePlugin,
        HorizontalRulePlugin,
        LinkPlugin,
        BasicElementsPlugin,
        BasicMarksPlugin,
        TablePlugin,
        LineHeightPlugin.extend(() => injectConfig),
        AlignPlugin.extend(() => injectConfig),
        IndentPlugin.extend(() => injectConfig),
        DocxPlugin,
        JuicePlugin,
      ],
    });

    actual.insertData(
      createClipboardData(readTestFile(`../__tests__/${filename}.html`))
    );

    expect(actual.children).toEqual(expected.children);
  });
};
