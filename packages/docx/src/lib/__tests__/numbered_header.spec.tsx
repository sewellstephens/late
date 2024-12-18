/** @jsx jsx */

import { IndentListPlugin } from '@sewell_stephens/late-indent-list';
import { jsx } from '@sewell_stephens/late-test-utils';

import { getDocxTestName, testDocxDeserializer } from './testDocxDeserializer';

jsx;

const name = 'numbered_header';

describe(getDocxTestName(name), () => {
  testDocxDeserializer({
    expected: (
      <editor>
        <hh1 indent={1} listStyleType="decimal">
          A Numbered Header.
        </hh1>
      </editor>
    ),
    filename: name,
    plugins: [IndentListPlugin],
  });
});
