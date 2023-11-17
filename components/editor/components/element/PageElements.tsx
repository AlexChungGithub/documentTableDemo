import Utils from "../../utils";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
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

export default function PageElement(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.element.id,
    });
  const subItem = props.element.children.map(
    (element: { id: any }) => element.id
  );
  return (
      <div
        className="page-item"
        id={props.element.id}
        ref={setNodeRef}
        {...props.attributes}
        style={{
          width: "210mm",
          height: "297mm",
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "60px",
        }}>
        <SortableContext items={subItem} strategy={verticalListSortingStrategy}>
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
