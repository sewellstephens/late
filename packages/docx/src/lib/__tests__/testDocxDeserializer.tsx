/** @jsx jsx */

import { AlignPlugin } from '@sewell_stephens/late-alignment';
import { BasicElementsPlugin } from '@sewell_stephens/late-basic-elements';
import { BasicMarksPlugin } from '@sewell_stephens/late-basic-marks';
import {
  type SlatePlugin,
  type SlatePlugins,
  createSlateEditor,
} from '@sewell_stephens/late-common';
import { ParagraphPlugin } from '@sewell_stephens/late-common';
import { HEADING_KEYS } from '@sewell_stephens/late-heading';
import { HorizontalRulePlugin } from '@sewell_stephens/late-horizontal-rule';
import { IndentPlugin } from '@sewell_stephens/late-indent';
import { JuicePlugin } from '@sewell_stephens/late-juice';
import { LineHeightPlugin } from '@sewell_stephens/late-line-height';
import { LinkPlugin } from '@sewell_stephens/late-link';
import { ImagePlugin } from '@sewell_stephens/late-media';
import { TablePlugin } from '@sewell_stephens/late-table';
import { jsx } from '@sewell_stephens/late-test-utils';

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
