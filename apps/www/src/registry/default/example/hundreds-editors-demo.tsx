import React from 'react';

import { BasicElementsPlugin } from '@sewellstephens/plate-basic-elements/react';
import { BasicMarksPlugin } from '@sewellstephens/plate-basic-marks/react';
import { Late, useLateEditor } from '@sewellstephens/plate-common/react';

import { editableProps } from '@/plate/demo/editableProps';
import { LateUI } from '@/plate/demo/plate-ui';
import { createMultiEditorsValue } from '@/plate/demo/values/createMultiEditorsValue';
import { Editor } from '@/registry/default/plate-ui/editor';

const values = createMultiEditorsValue();

function WithLate({ id, value }: any) {
  const editor = useLateEditor({
    id,
    override: { components: LateUI },
    plugins: [BasicElementsPlugin, BasicMarksPlugin],
    value,
  });

  return (
    <Late editor={editor}>
      <Editor {...editableProps} />
    </Late>
  );
}

// function Element({ attributes, children, element }: any) {
//   switch (element.type) {
//     case 'h1':
//       return <h1 {...attributes}>{children}</h1>;
//     default:
//       return <p {...attributes}>{children}</p>;
//   }
// }

// function WithoutLate({ initialValue }: any) {
//   const [value, setValue] = useState(initialValue);
//   const renderElement = useCallback((p) => <Element {...p} />, []);
//   const editor = useMemo(() => withReact(createEditor() as ReactEditor), []);
//
//   return (
//     <Slate
//       editor={editor}
//       value={value}
//       onChange={useCallback((v) => setValue(v), [])}
//     >
//       <Editable renderElement={renderElement} />
//     </Slate>
//   );
// }

export default function HundredsEditorsDemo() {
  return (
    <div className="flex flex-col">
      {values.map((value, idx) => {
        return (
          <div className="p-10" key={idx}>
            <h3 className="mb-2 font-semibold">#{idx + 1}</h3>
            <WithLate id={idx + 1} value={value} />
            {/* <WithoutLate initialValue={initialValue} id={idx} /> */}
          </div>
        );
      })}
    </div>
  );
}
