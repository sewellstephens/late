import type { JSHandle, Page } from '@playwright/test';

import type { TLatePlaywrightAdapter } from '../types';

export const getAdapter = (
  page: Page
): Promise<JSHandle<TLatePlaywrightAdapter>> =>
  page.evaluateHandle(() => {
    const adapter = window.platePlaywrightAdapter;

    if (!adapter) {
      throw new Error(
        'window.platePlaywrightAdapter not found. Ensure that <LatePlaywrightAdapter /> is rendered as a child of your Late editor.'
      );
    }

    return adapter;
  }) as any;
