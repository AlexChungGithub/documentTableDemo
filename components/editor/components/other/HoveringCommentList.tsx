import { Portal } from "./Portal";
import { Editor } from "slate";

export default function HoveringCommentList(props: {
  opacity: string;
  top: string;
  left: string;
  comments: string[];
  editor: any;
}) {
  return (
    <div
      style={{
        padding: "8px 7px 6px",
        position: "absolute",
        zIndex: "1",
        top: `${props.top}`,
        left: `${props.left}`,
        opacity: props.opacity,
        backgroundColor: "white",
        borderRadius: "4px",
        border: "1px solid black",
        transition: "opacity 0.75s",
      }}
      onMouseDown={(e) => {
        // prevent toolbar from taking focus away from editor
        e.preventDefault();
      }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        Comments
        <div style={{ padding: "5px" }}>
          {props.comments &&
            props.comments.map(
              (comment, index) =>
                comment && (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      border: "1px solid lightgray",
                      borderRadius: "4px",
                      gap: "5px",
                      padding: "5px",
                    }}>
                    <div style={{ flex: "1" }}>{comment}</div>

                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        color: "gray",
                      }}
                      onClick={() => {
                        const newComment = window.prompt(
                          "edit comment",
                          comment
                        );
                        if (newComment) {
                          const tempCommentArr = Array.from(props.comments);
                          const index = tempCommentArr.indexOf(comment);
                          tempCommentArr.splice(index, 1, newComment);
                          Editor.removeMark(props.editor, "comments");
                          Editor.addMark(
                            props.editor,
                            "comments",
                            tempCommentArr
                          );
                        }
                      }}>
                      edit
                    </button>
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        color: "gray",
                      }}
                      onClick={() => {
                        const tempCommentArr = Array.from(props.comments);
                        const index = tempCommentArr.indexOf(comment);
                        tempCommentArr.splice(index, 1);
                        if (!tempCommentArr.length) {
                          Editor.removeMark(props.editor, "haveComment");
                          Editor.removeMark(props.editor, "comments");
                        } else {
                          Editor.removeMark(props.editor, "comments");
                          Editor.addMark(
                            props.editor,
                            "comments",
                            tempCommentArr
                          );
                        }
                      }}>
                      delete
                    </button>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
}
