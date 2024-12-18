import * as portiveClient from '@portive/client';
import { createLatePlugin } from '@sewell_stephens/late-common/react';
import Defer from 'p-defer';

import type { UploadError, UploadSuccess } from '../upload';
import type { TCloudImageElement } from './types';

import {
  CloudPlugin,
  type ErrorEvent,
  type ImageFileEvent,
  type ProgressEvent,
  type SuccessEvent,
} from '../cloud';

export const CloudImagePlugin = createLatePlugin({
  dependencies: ['cloud'],
  key: 'cloud_image',
  node: { isElement: true, isVoid: true },
  options: {
    maxInitialHeight: 320,
    maxInitialWidth: 320,
    maxResizeWidth: 640,
    minResizeWidth: 100,
  },
}).extendApi(({ editor, getOptions }) => {
  const { uploadStore } = editor.getOptions(CloudPlugin);

  /**
   * We create a deferredFinish which is an object with a `promise` and a way to
   * `resolve` or `reject` the Promise outside of the Promise. We use `p-defer`
   * library to do this. The `finish` Promise gets added to the `origin` object
   * so we can await `origin.finish` during the save process to wait for all the
   * files to finish uploading.
   */
  const deferredFinish = Defer<UploadError | UploadSuccess>();
  const finishPromise = deferredFinish.promise;

  return {
    onError: (e: ErrorEvent & ImageFileEvent) => {
      const upload: UploadError = {
        message: e.message,
        status: 'error',
        url: e.url,
      };
      uploadStore.set.upload(e.id, upload);
      deferredFinish.resolve(upload);
    },
    onProgress: (e: ImageFileEvent & ProgressEvent) => {
      uploadStore.set.upload(e.id, {
        finishPromise,
        sentBytes: e.sentBytes,
        status: 'progress',
        totalBytes: e.totalBytes,
        url: e.url,
      });
    },
    onStart: (e: ImageFileEvent) => {
      const { height, width } = portiveClient.resizeIn(
        { height: e.height, width: e.width },
        {
          height: getOptions().maxInitialHeight,
          width: getOptions().maxInitialWidth,
        }
      );
      const node: TCloudImageElement = {
        bytes: e.file.size,
        children: [{ text: '' }],
        height,
        maxHeight: e.height,
        maxWidth: e.width,
        type: 'cloud_image',
        url: e.id,
        width,
      };
      editor.insertNode(node);
      uploadStore.set.upload(e.id, {
        finishPromise,
        sentBytes: 0,
        status: 'progress',
        totalBytes: e.file.size,
        url: e.url,
      });
    },
    onSuccess: (e: ImageFileEvent & SuccessEvent) => {
      const upload: UploadSuccess = {
        status: 'success',
        url: e.url,
      };
      uploadStore.set.upload(e.id, upload);
      deferredFinish.resolve(upload);
    },
  };
});
