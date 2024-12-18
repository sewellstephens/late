/** @jsx jsx */
import { jsx } from '@sewell_stephens/late-test-utils';

import { getDocxTestName, testDocxDeserializer } from './testDocxDeserializer';

jsx;

const name = 'codeblock';

describe(getDocxTestName(name), () => {
  testDocxDeserializer({
    expected: (
      <editor>
        <hp>This is some code:</hp>
        <hcodeblock>
          <hcodeline>readDocx :: ReaderOptions</hcodeline>
          <hcodeline>
            {` `}
            {` `}
            {` `}
            {` `}
            {` `}
            {` `}
            {` `}
            {` `} -{'>'} B.ByteString
          </hcodeline>
          <hcodeline>
            {` `}
            {` `}
            {` `}
            {` `}
            {` `}
            {` `}
            {` `}
            {` `} -{'>'} Pandoc
          </hcodeline>
        </hcodeblock>
        <hp>from the beginning of the docx reader.</hp>
      </editor>
    ),
    filename: name,
  });
});
