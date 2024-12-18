/** @jsxRuntime classic */
/** @jsx jsx */
import { HorizontalRulePlugin } from '@sewell_stephens/late-horizontal-rule/react';
import { jsx } from '@sewell_stephens/late-test-utils';

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
