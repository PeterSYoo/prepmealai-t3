import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { IRecipe } from "additional";
import type { UniqueIdentifier } from "@dnd-kit/core";

export const SavedRecipesCard = ({
  recipe,
  i,
  isDragging,
  handleRecipeClick,
}: {
  recipe: IRecipe;
  refetch: () => void;
  i: number;
  activeId: UniqueIdentifier | null;
  isDragging: boolean;
  handleRecipeClick: (recipe: IRecipe) => void;
}) => {
  // States ------------------------------------------------------------- ***
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: getId(recipe) });

  // Constants ----------------------------------------------------------- ***
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition
      ? `transform ${transition}ms ease-in-out`
      : undefined,
  };

  // Custom Functions ---------------------------------------------------- ***
  const getId = (recipe: IRecipe) => {
    if (recipe.id) {
      return recipe.id;
    } else {
      throw new Error("Recipe ID is undefined");
    }
  };

  // JSX ------------------------------------------------------------------ ***
  return (
    <section
      className={`bg-start mb-[50px] grid min-h-[380px] w-[260px] break-inside-avoid grid-rows-[80px_1fr_130px] rounded-[25px] border border-[#D9CCC3] bg-white bg-[url('https://res.cloudinary.com/dryh1nvhk/image/upload/v1679034955/PrepMeal%20AI/Recipe%20Board/Ellipse_4_2_zoytb3.png')] bg-no-repeat px-[24px] pt-[19px] pb-[27px] shadow-[3px_3px_10px_1px] shadow-black/30 ${
        isDragging ? "invisible" : ""
      }`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => handleRecipeClick(recipe)}
    >
      {/* Row 1 */}
      <div className="flex gap-[17px]">
        <div className="flex h-[29px] w-full max-w-[29px] items-center justify-center rounded-full bg-white">
          {i + 1}
        </div>
        <p className="text-[14px] font-bold">{recipe?.name}</p>
      </div>
      {/*  */}
      {/* Row 2 */}
      <div className="flex justify-center">
        <p className="text-[14px]">{recipe?.description}</p>
      </div>
      {/*  */}
      {/* Row 3 */}
      <div
        className={`
  ${
    (recipe?.proteinChoice.toLowerCase().includes("beef") &&
      'bg-[url("https://res.cloudinary.com/dryh1nvhk/image/upload/v1679453767/PrepMeal%20AI/Recipe%20Board/beef-c_bbuvfi.png")]') ||
    (recipe?.proteinChoice.toLowerCase().includes("chicken") &&
      'bg-[url("https://res.cloudinary.com/dryh1nvhk/image/upload/v1679453768/PrepMeal%20AI/Recipe%20Board/chicken-c_setauk.png")]') ||
    (recipe?.proteinChoice.toLowerCase().includes("turkey") &&
      'bg-[url("https://res.cloudinary.com/dryh1nvhk/image/upload/v1679453767/PrepMeal%20AI/Recipe%20Board/turkey-c_kwdk9o.png")]') ||
    (recipe?.proteinChoice.toLowerCase().includes("egg") &&
      'bg-[url("https://res.cloudinary.com/dryh1nvhk/image/upload/v1679453767/PrepMeal%20AI/Recipe%20Board/egg-c_drfqjv.png")]') ||
    (recipe?.proteinChoice.toLowerCase().includes("salmon") &&
      'bg-[url("https://res.cloudinary.com/dryh1nvhk/image/upload/v1679030364/PrepMeal%20AI/Recipe%20Board/salmon-circle_fboiai.png")]') ||
    (recipe?.proteinChoice.toLowerCase().includes("pork") &&
      'bg-[url("https://res.cloudinary.com/dryh1nvhk/image/upload/v1679453767/PrepMeal%20AI/Recipe%20Board/pork-c_fe6mxx.png")]') ||
    (recipe?.proteinChoice.toLowerCase().includes("lobster") &&
      'bg-[url("https://res.cloudinary.com/dryh1nvhk/image/upload/v1679453767/PrepMeal%20AI/Recipe%20Board/lobster-c_m0zlim.png")]') ||
    (recipe?.proteinChoice.toLowerCase().includes("tofu") &&
      'bg-[url("https://res.cloudinary.com/dryh1nvhk/image/upload/v1679453767/PrepMeal%20AI/Recipe%20Board/tofu-c_lwgxkn.png")]') ||
    (recipe?.proteinChoice.toLowerCase().includes("quinoa") &&
      'bg-[url("https://res.cloudinary.com/dryh1nvhk/image/upload/v1679453767/PrepMeal%20AI/Recipe%20Board/quinoa-c_r2ycbc.png")]') ||
    `bg-[url('https://res.cloudinary.com/dryh1nvhk/image/upload/v1679453767/PrepMeal%20AI/Recipe%20Board/default-c_d1youf.png')]`
  } 
  mx-auto h-[130px] w-[130px] rounded-full border-4 border-[#DBD7CC]`}
      ></div>
      {/*  */}
    </section>
  );
};
