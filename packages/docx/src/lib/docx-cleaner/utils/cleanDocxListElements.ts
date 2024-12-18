import { traverseHtmlElements } from '@sewell_stephens/late-common';

/** Clean elements style mso-list to mso-list:Ignore */
export const cleanDocxListElements = (rootNode: Node): void => {
  traverseHtmlElements(rootNode, (element) => {
    const styleAttribute = element.getAttribute('style');

    if (styleAttribute) {
      element.setAttribute(
        'style',
        styleAttribute.replaceAll(/mso-list:\s*ignore/gi, 'mso-list:Ignore')
      );
    }

    return true;
  });
};
