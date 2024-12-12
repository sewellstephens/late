import {
  type PluginConfig,
  type TElement,
  type TPath,
  type WithRequiredKey,
  createTSlatePlugin,
} from '@sewellstephens/plate-common';

import { withCaption } from './withCaption';

export interface TCalloutElement extends TElement {
  backgroundColor?: string;
  color?: string;
  icon?: string;
  variant?: 'info' | 'note' | 'tip' | 'warning';
}

export type CaptionConfig = PluginConfig<
  'caption',
  {
    /** When defined, focus end of caption textarea with the same path. */
    focusEndPath: TPath | null;
    /** When defined, focus start of caption textarea with the same path. */
    focusStartPath: TPath | null;
    // isVisible?: (elementId: string) => boolean;
    /** Plugins to enable caption. */
    plugins: WithRequiredKey[];

    visibleId: null | string;
  } & CaptionSelectors
>;

type CaptionSelectors = {
  isVisible?: (elementId: string) => boolean;
};

/** Enables support for caption. */
export const CaptionPlugin = createTSlatePlugin<CaptionConfig>({
  extendEditor: withCaption,
  key: 'caption',
  options: {
    focusEndPath: null,
    focusStartPath: null,
    plugins: [],
    visibleId: null,
  },
}).extendOptions<CaptionSelectors>(({ getOptions }) => ({
  isVisible: (elementId) => getOptions().visibleId === elementId,
}));
