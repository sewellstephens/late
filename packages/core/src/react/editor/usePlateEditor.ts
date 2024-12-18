import React from 'react';

import type { Value } from '@sewellstephens/slate';

import type { AnyPluginConfig } from '../../lib';

import {
  type CreateLateEditorOptions,
  type LateCorePlugin,
  type TLateEditor,
  createLateEditor,
} from '../editor';

/**
 * A memoized version of createLateEditor for use in React components.
 *
 * @param {CreateLateEditorOptions} options - Configuration options for
 *   creating the Late editor.
 * @param {React.DependencyList} [deps=[]] - Additional dependencies for the
 *   useMemo hook, in addition to `options.id`. Default is `[]`
 * @see {@link createLateEditor} for detailed information on React editor creation and configuration.
 * @see {@link createSlateEditor} for a non-React version of editor creation.
 * @see {@link withLate} for the underlying React-specific enhancement function.
 */
export function useLateEditor<
  V extends Value = Value,
  P extends AnyPluginConfig = LateCorePlugin,
  TEnabled extends boolean | undefined = undefined,
>(
  options: { enabled?: TEnabled } & CreateLateEditorOptions<V, P> = {},
  deps: React.DependencyList = []
): TEnabled extends false
  ? null
  : TEnabled extends true | undefined
    ? TLateEditor<V, P>
    : TLateEditor<V, P> | null {
  return React.useMemo(
    (): any => {
      if (options.enabled === false) return null;

      return createLateEditor(options);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options.id, options.enabled, ...deps]
  );
}
