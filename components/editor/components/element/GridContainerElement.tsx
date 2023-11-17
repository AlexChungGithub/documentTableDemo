import Utils from "../../utils";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

const Sortable = ({ element, children }: any) => {
  const sortable: any = useSortable({ id: element.id });
  return (
    <div
      className="sortable"
      {...sortable.attributes}
      ref={sortable.setNodeRef}
      style={{
        transition: sortable.transition,
        "--translate-y": Utils.toPx(sortable.transform?.y),
        "--translate-x": Utils.toPx(sortable.transform?.x),
        pointerEvents: sortable.isSorting ? "none" : undefined,
        width: "50%",
      }}>
      <button
        style={{
          userSelect: "none",
          background: "none",
          border: "none",
          fontSize: "15px",
        }}
        contentEditable={false}
        {...sortable.listeners}>
        ⠿
      </button>
      <div style={{ flex: "1", maxWidth: "100%" }}>{children}</div>
    </div>
  );
};

export default function GridContainerElement(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.element.id,
    });
  const subItem = props.element.children.map(
    (element: { id: any }) => element.id
  );

  return (
    <div
    ref={setNodeRef}
      style={{
        width: "100%",
        display: "flex",
        border: "1px solid black",
        flexDirection: "row",
        justifyContent: "center",
      }}
      {...props.attributes}>
      <SortableContext items={subItem} strategy={horizontalListSortingStrategy}>
        {props.children.map(
          (child: any, index: any) =>
            child.props?.children?.props?.element && (
              <Sortable
                key={index}
                element={child.props.children.props.element}>
                {child}
              </Sortable>
            )
        )}
      </SortableContext>
    </div>
  );
}
