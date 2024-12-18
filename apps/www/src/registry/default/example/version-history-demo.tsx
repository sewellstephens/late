import React from 'react';

import { cn } from '@sewell_stephens/cn';
import { BoldPlugin, ItalicPlugin } from '@sewell_stephens/late-basic-marks/react';
import { SoftBreakPlugin } from '@sewell_stephens/late-break/react';
import { type Value, createSlatePlugin, isInline } from '@sewell_stephens/late-common';
import {
  ParagraphPlugin,
  createLatePlugin,
  toLatePlugin,
} from '@sewell_stephens/late-common/react';
import {
  Late,
  LateContent,
  LateElement,
  type LateElementProps,
  LateLeaf,
  type LateLeafProps,
  type LateProps,
  createLateEditor,
  useLateEditor,
} from '@sewell_stephens/late-common/react';
import {
  type DiffOperation,
  type DiffUpdate,
  computeDiff,
  withGetFragmentExcludeDiff,
} from '@sewell_stephens/late-diff';
import { cloneDeep } from 'lodash';
import { useSelected } from 'slate-react';

import { LateUI } from '@/lib/plate/demo/plate-ui';
import { Button } from '@/registry/default/plate-ui/button';

const InlinePlugin = createLatePlugin({
  key: 'inline',
  node: { isElement: true, isInline: true },
});

const InlineVoidPlugin = createLatePlugin({
  key: 'inline-void',
  node: { isElement: true, isInline: true, isVoid: true },
});

const diffOperationColors: Record<DiffOperation['type'], string> = {
  delete: 'bg-red-200',
  insert: 'bg-green-200',
  update: 'bg-blue-200',
};

const describeUpdate = ({ newProperties, properties }: DiffUpdate) => {
  const addedProps: string[] = [];
  const removedProps: string[] = [];
  const updatedProps: string[] = [];

  Object.keys(newProperties).forEach((key) => {
    const oldValue = properties[key];
    const newValue = newProperties[key];

    if (oldValue === undefined) {
      addedProps.push(key);

      return;
    }
    if (newValue === undefined) {
      removedProps.push(key);

      return;
    }

    updatedProps.push(key);
  });

  const descriptionParts = [];

  if (addedProps.length > 0) {
    descriptionParts.push(`Added ${addedProps.join(', ')}`);
  }
  if (removedProps.length > 0) {
    descriptionParts.push(`Removed ${removedProps.join(', ')}`);
  }
  if (updatedProps.length > 0) {
    updatedProps.forEach((key) => {
      descriptionParts.push(
        `Updated ${key} from ${properties[key]} to ${newProperties[key]}`
      );
    });
  }

  return descriptionParts.join('\n');
};

const InlineElement = ({ children, ...props }: LateElementProps) => {
  return (
    <LateElement
      {...props}
      as="span"
      className="rounded-sm bg-slate-200/50 p-1"
    >
      {children}
    </LateElement>
  );
};

const InlineVoidElement = ({ children, ...props }: LateElementProps) => {
  const selected = useSelected();

  return (
    <LateElement {...props} as="span">
      <span
        className={cn(
          'rounded-sm bg-slate-200/50 p-1',
          selected && 'bg-blue-500 text-white'
        )}
        contentEditable={false}
      >
        Inline void
      </span>
      {children}
    </LateElement>
  );
};

const DiffPlugin = toLatePlugin(
  createSlatePlugin({
    extendEditor: withGetFragmentExcludeDiff,
    key: 'diff',
    node: { isLeaf: true },
  }),
  {
    render: {
      aboveNodes:
        () =>
        ({ children, editor, element }) => {
          if (!element.diff) return children;

          const diffOperation = element.diffOperation as DiffOperation;

          const label = (
            {
              delete: 'deletion',
              insert: 'insertion',
              update: 'update',
            } as any
          )[diffOperation.type];

          const Component = isInline(editor, element) ? 'span' : 'div';

          return (
            <Component
              aria-label={label}
              className={diffOperationColors[diffOperation.type]}
              title={
                diffOperation.type === 'update'
                  ? describeUpdate(diffOperation)
                  : undefined
              }
            >
              {children}
            </Component>
          );
        },
      node: DiffLeaf,
    },
  }
);

function DiffLeaf({ children, ...props }: LateLeafProps) {
  const diffOperation = props.leaf.diffOperation as DiffOperation;

  const Component = (
    {
      delete: 'del',
      insert: 'ins',
      update: 'span',
    } as any
  )[diffOperation.type];

  return (
    <LateLeaf {...props} asChild>
      <Component
        className={diffOperationColors[diffOperation.type]}
        title={
          diffOperation.type === 'update'
            ? describeUpdate(diffOperation)
            : undefined
        }
      >
        {children}
      </Component>
    </LateLeaf>
  );
}

const initialValue: Value = [
  {
    children: [{ text: 'This is a version history demo.' }],
    type: ParagraphPlugin.key,
  },
  {
    children: [
      { text: 'Try editing the ' },
      { bold: true, text: 'text and see what' },
      { text: ' happens.' },
    ],
    type: ParagraphPlugin.key,
  },
  {
    children: [
      { text: 'This is an ' },
      { children: [{ text: '' }], type: InlineVoidPlugin.key },
      { text: '. Try removing it.' },
    ],
    type: ParagraphPlugin.key,
  },
  {
    children: [
      { text: 'This is an ' },
      { children: [{ text: 'editable inline' }], type: InlinePlugin.key },
      { text: '. Try editing it.' },
    ],
    type: ParagraphPlugin.key,
  },
];

const plugins = [
  InlinePlugin.withComponent(InlineElement),
  InlineVoidPlugin.withComponent(InlineVoidElement),
  BoldPlugin,
  ItalicPlugin,
  DiffPlugin,
  SoftBreakPlugin,
];

function VersionHistoryLate(props: Omit<LateProps, 'children'>) {
  return (
    <Late {...props}>
      <LateContent className="rounded-md border p-3" />
    </Late>
  );
}

interface DiffProps {
  current: Value;
  previous: Value;
}

function Diff({ current, previous }: DiffProps) {
  const diffValue = React.useMemo(() => {
    const editor = createLateEditor({
      plugins,
    });

    return computeDiff(previous, cloneDeep(current), {
      isInline: editor.isInline,
      lineBreakChar: '¶',
    }) as Value;
  }, [previous, current]);

  const editor = useLateEditor(
    {
      override: { components: LateUI },
      plugins,
      value: diffValue,
    },
    [diffValue]
  );

  return (
    <>
      <VersionHistoryLate
        editor={editor}
        key={JSON.stringify(diffValue)}
        readOnly
      />

      <pre>{JSON.stringify(diffValue, null, 2)}</pre>
    </>
  );
}

export default function VersionHistoryDemo() {
  const [revisions, setRevisions] = React.useState<Value[]>([initialValue]);
  const [selectedRevisionIndex, setSelectedRevisionIndex] =
    React.useState<number>(0);
  const [value, setValue] = React.useState<Value>(initialValue);

  const selectedRevisionValue = React.useMemo(
    () => revisions[selectedRevisionIndex],
    [revisions, selectedRevisionIndex]
  );

  const saveRevision = () => {
    setRevisions([...revisions, value]);
  };

  const editor = useLateEditor({
    override: { components: LateUI },
    plugins,
    value: initialValue,
  });

  const editorRevision = useLateEditor(
    {
      override: { components: LateUI },
      plugins,
      value: selectedRevisionValue,
    },
    [selectedRevisionValue]
  );

  return (
    <div className="flex flex-col gap-3 p-3">
      <Button onClick={saveRevision}>Save revision</Button>

      <VersionHistoryLate
        editor={editor}
        onChange={({ value }) => setValue(value)}
      />

      <label>
        Revision to compare:
        <select
          className="rounded-md border p-1"
          onChange={(e) => setSelectedRevisionIndex(Number(e.target.value))}
        >
          {revisions.map((_, i) => (
            <option key={i} value={i}>
              Revision {i + 1}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <h2>Revision {selectedRevisionIndex + 1}</h2>
          <VersionHistoryLate
            editor={editorRevision}
            key={selectedRevisionIndex}
            readOnly
          />
        </div>

        <div>
          <h2>Diff</h2>
          <Diff current={value} previous={selectedRevisionValue} />
        </div>
      </div>
    </div>
  );
}
