import Utils from "../utils";
import {
  Transforms,
  Element,
  Node,
  Editor,
  Text,
  Path,
  Operation,
} from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

const emptyPage: Element = {
  type: "page",
  children: [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ],
};

export default function withCustomNormalize(editor: ReactEditor) {
  const { normalizeNode } = editor;
  editor.normalizeNode = (entry) => {
    const [node, path] = entry;
    if (Text.isText(node)) {
      return normalizeNode(entry);
    }

    // if the node is Page
    if (Element.isElement(node) && node.type === "page") {
      let PageNode;

      window.setTimeout(() => {
        const path = Utils.findTargetNodePath(editor, node.id ? node.id : "");
        const nextElement = path
          ? Editor.next(editor, { at: path })
          : undefined;
        const [nextPageNode, nextPagePath] = nextElement || [];
        let hasNextPage =
          nextPageNode && Element.isElement(nextPageNode) && nextPageNode.type === "page" && nextPagePath;

        try {
          PageNode = ReactEditor.toDOMNode(editor, node);
        } catch (e) {
          return;
        }
        const style = window.getComputedStyle(PageNode);
        const computedHeight = PageNode.offsetHeight;
        const padding =
          parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);

        let pageHeight = computedHeight - padding;

        let currentPageHeight = 0;

        const children = Array.from(PageNode.children);

        children.forEach((child, index) => {
          const childHeight = computeItemHeight(child);
          currentPageHeight = currentPageHeight + childHeight;
          if (currentPageHeight > pageHeight) {
            // if has next page, only move nodes
            if (hasNextPage && nextPagePath) {
              moveChildToNextPage(editor, index, path, nextPagePath);
            } else {
              createPageAndMove(editor, index, path, node);
            }
          }
        });

        // if current page have enough height can contain next page first child node,
        //  we need move this node
        if (currentPageHeight < pageHeight && nextPageNode && nextPagePath) {
          let empytHeiht = pageHeight - currentPageHeight;
          const nextPageNodes = ReactEditor.toDOMNode(editor, nextPageNode);
          const nextPageChildren = Array.from(nextPageNodes.children);
          nextPageChildren.forEach((child, index) => {
            const childHeight = computeItemHeight(child);
            if (empytHeiht < childHeight) return;
            empytHeiht = empytHeiht - childHeight;
            if (empytHeiht < childHeight) {
              const toPath = path.concat([children.length]);
              riseElementToPrevPage(editor, index, nextPagePath, toPath);
            }
            // if move done, this page is empty, remove this page
            if (index === nextPageChildren.length - 1) {
              Transforms.removeNodes(editor, {
                at: nextPagePath,
              });
            }
          });
        }
      }, 0);
    }

    return normalizeNode(entry);
  };

  return editor;
}

function computeItemHeight(dom: globalThis.Element): number {
  const style = window.getComputedStyle(dom);
  const clientHeight = dom.clientHeight;
  const margin = parseFloat(style.marginTop) + parseFloat(style.marginBottom);
  const padding =
    parseFloat(style.paddingBottom) + parseFloat(style.paddingTop);
  const border =
    parseFloat(style.borderLeftWidth) +
    parseFloat(style.borderRightWidth) +
    parseFloat(style.borderTopWidth) +
    parseFloat(style.borderBottomWidth);

  const height = clientHeight + margin + padding + border;
  return height;
}

function moveChildToNextPage(
  editor: ReactEditor,
  splitIndex: number,
  formPath: Path,
  toPath: Path
): void {
  Transforms.moveNodes(editor, {
    at: formPath,
    match(n) {
      if (!Editor.isEditor(n) && Element.isElement(n) && n.type != "page") {
        let path = null;
        try {
          path = ReactEditor.findPath(editor, n);
        } catch (error) {
          // i dont know, if node path equal to selection, will throw error
          path = (editor.selection && editor.selection.anchor.path) || [];
        }
        return path.length == 2 && path[1] >= splitIndex;
      }
      return false;
    },
    to: toPath.concat([0]),
  });
}

function createPageAndMove(
  editor: ReactEditor,
  splitIndex: number,
  formPath: Path,
  entryNode: Node
) {
  // need create page node
  Transforms.wrapNodes(editor, emptyPage, {
    at: formPath,
    split: true,
    match(n) {
      if (!Editor.isEditor(n) && Element.isElement(n) && n.type != "page") {
        let path = null;
        try {
          path = ReactEditor.findPath(editor, n);
        } catch (error) {
          // i dont know, if node path equal to selection, will throw error
          path = (editor.selection && editor.selection.anchor.path) || [];
        }
        return path.length == 2 && path[1] >= splitIndex;
      }
      return false;
    },
  });

  Transforms.moveNodes(editor, {
    at: formPath,
    match(n) {
      if (
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        n.type == "page" &&
        n != entryNode
      ) {
        return true;
      }
      return false;
    },
    to: [formPath[0] + 1],
  });

  //   if (undoAllPage) {
  //     editor.history.undos.splice(editor.history.undos.length - 2, 1);
  //     const lastOp = editor.history.undos[editor.history.undos.length - 1];
  //     console.log("before: ", lastOp);
  //     lastOp.operations[0].path = insertPagePath;
  //     lastOp.operations.splice(lastOp.operations.length - 2, 1);
  //     //   console.log("after: ", lastOp);
  //     var inverseOps = lastOp.operations.map(Operation.inverse).reverse();

  //     //   for (var op of inverseOps) {
  //     //     console.log("op: ", op);
  //     //   }
  //   }
}

function riseElementToPrevPage(
  editor: ReactEditor,
  splitIndex: number,
  formPath: Path,
  toPath: Path
) {
  try {
    Transforms.moveNodes(editor, {
      at: formPath,
      match(n) {
        if (!Editor.isEditor(n) && Element.isElement(n) && n.type != "page") {
          let path;
          try {
            path = ReactEditor.findPath(editor, n);
          } catch (error) {
            return false;
          }
          return path.length == 2 && path[1] <= splitIndex;
        }
        return false;
      },
      to: toPath, // move to previous page last position
    });
  } catch (error) {
    console.log("error: ", error);
  }
}

// export default withCustomNormalize;
