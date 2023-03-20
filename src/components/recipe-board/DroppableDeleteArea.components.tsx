import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const DroppableDeleteArea = () => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: "delete-container" });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 z-10 w-full rounded-b-[25px]"
        ref={setNodeRef}
        style={style}
      >
        <div className="flex h-[150px] items-center justify-center rounded-b-[25px] border-b border-dashed border-[#b7afaa] bg-[#DBD7CC]">
          <h1 className="pt-[50px] font-bold text-[#000000]">
            Drag here to delete
          </h1>
        </div>
      </div>
    </>
  );
};
