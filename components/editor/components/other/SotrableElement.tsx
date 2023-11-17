import Utils from "../../utils";
import { useSortable } from "@dnd-kit/sortable";

const Sortable = ({ sortable, children }: any) => {
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
      {children}
    </div>
  );
};

export const SortableElement = ({
  attributes,
  element,
  children,
  renderElement,
  editor
}: any) => {
  const sortable = useSortable({ id: element.id });
  return (
    <div {...attributes}>
      <Sortable sortable={sortable}>
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
        <div>{renderElement({ element, children, editor })}</div>
      </Sortable>
    </div>
  );
};
