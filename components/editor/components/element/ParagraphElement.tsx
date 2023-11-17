
import { useSelected, useSlate } from "slate-react";
import { Editor, Range } from "slate";
import "./styles.css";
export default function ParagraphElement(props: any) {
  const editor = useSlate();
  const selection = editor.selection;
  let isSelectionCollapsed = true;
  let isEmpty = true;
  if (selection !== null) {
    const [start] = Range.edges(selection);
    const lineText = Editor.string(editor, start.path);
    isSelectionCollapsed = Range.isCollapsed(selection);
    isEmpty = lineText === "" && start.path.length === 3 && start.path[2] === 0 ? true : false
  }
  const selected = useSelected();
  return (
    <p
      id={props.element.id}
      style={{ textAlign: props.element.align }}
      className={
        selected && isEmpty && isSelectionCollapsed
          ? "selected-empty-element"
          : ""
      }
      {...props.attributes}>
      {props.children}
    </p>
  );
}
