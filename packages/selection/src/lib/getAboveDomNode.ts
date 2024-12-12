export const getSelectedDomNode = (id: string) => {
  return document.querySelector(`.slate-selectable[data-key="${id}"]`);
};

export const getAllSelectableDomNode = () => {
  return document.querySelectorAll(`.slate-selectable`);
};
