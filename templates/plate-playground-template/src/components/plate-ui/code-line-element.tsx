'use client';

import React from 'react';
import { withRef } from '@sewell_stephens/cn';
import { LateElement } from '@sewell_stephens/late-common';

export const CodeLineElement = withRef<typeof LateElement>((props, ref) => (
  <LateElement ref={ref} {...props} />
));
