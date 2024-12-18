import type { TLatePlaywrightAdapter } from './types';

declare global {
  interface Window {
    platePlaywrightAdapter?: TLatePlaywrightAdapter;
  }
}
