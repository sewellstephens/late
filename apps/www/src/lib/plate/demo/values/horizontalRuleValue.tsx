/** @jsxRuntime classic */
/** @jsx jsx */
import { HorizontalRulePlugin } from '@sewellstephens/plate-horizontal-rule/react';
import { jsx } from '@sewellstephens/plate-test-utils';

jsx;

export const horizontalRuleValue: any = (
  <fragment>
    <hh2>Horizontal Rule</hh2>
    <hp>
      Add horizontal rules to visually separate sections and content within your
      document.
    </hp>
    <element type={HorizontalRulePlugin.key}>
      <htext />
    </element>
  </fragment>
);
