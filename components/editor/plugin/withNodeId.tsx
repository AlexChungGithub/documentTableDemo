import { Element } from "slate";
import Utils from "../utils";

export const assignIdRecursively = (node: any) => {
  if (Element.isElement(node)) {
    if(!node.id)
      node.id = Utils.makeNodeId(node);
    node.children?.forEach(assignIdRecursively);
  }
};

export const withNodeId = (editor: any) => {
  const { apply } = editor;
  editor.apply = (operation: any) => {
    if (operation.type === "insert_node") {
      assignIdRecursively(operation.node);
      return apply(operation);
    }

    if (operation.type === "split_node") {
      operation.properties.id = Utils.makeNodeId(operation);
      return apply(operation);
    }

    return apply(operation);
  };

  return editor;
};
