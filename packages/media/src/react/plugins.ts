import { toLatePlugin } from '@sewellstephens/plate-common/react';

import {
  AudioPlugin as BaseAudioPlugin,
  FilePlugin as BaseFilePlugin,
  ImagePlugin as BaseImagePlugin,
  MediaEmbedPlugin as BaseMediaEmbedPlugin,
  VideoPlugin as BaseVideoPlugin,
} from '../lib';

export const ImagePlugin = toLatePlugin(BaseImagePlugin);

export const MediaEmbedPlugin = toLatePlugin(BaseMediaEmbedPlugin);

export const AudioPlugin = toLatePlugin(BaseAudioPlugin);

export const FilePlugin = toLatePlugin(BaseFilePlugin);

export const VideoPlugin = toLatePlugin(BaseVideoPlugin);
