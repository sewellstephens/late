'use client';

import React from 'react';

import { withRef } from '@sewellstephens/cn';
import { LateElement } from '@sewellstephens/plate-common/react';

export const CodeLineElement = withRef<typeof LateElement>((props, ref) => (
  <LateElement ref={ref} {...props} />
));
