import { ReactEditor } from "slate-react";

const withCustomElement = (editor: ReactEditor) => {
  const {
    insertData,
    insertText,
    isInline,
    isElementReadOnly,
    isSelectable,
    isVoid,
  } = editor;

  editor.isInline = (element) =>
    ["link", "button", "badge", "inlineInput"].includes(element.type) || isInline(element);

  editor.isVoid = (element) =>
    ["image", "inlineInput"].includes(element.type) || isVoid(element);

  return editor;
};

export default withCustomElement;
