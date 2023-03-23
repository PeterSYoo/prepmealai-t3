import {
  DndContext,
  closestCenter,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  type UniqueIdentifier,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import type { IRecipe } from "additional";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DroppableDeleteArea } from "~/components/recipe-board/DroppableDeleteArea.components";
import { Recipe } from "~/components/recipe-board/Recipe.components";
import { RecipeDragOverlay } from "~/components/recipe-board/RecipeDragOverlay.components";
import { SavedRecipesCard } from "~/components/recipe-board/SavedRecipesCard.components";
import { api } from "~/utils/api";

const RecipeBoardPage = () => {
  // States ------------------------------------------------
  const [isRecipe, setIsRecipe] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<IRecipe | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [changesSaved, setChangesSaved] = useState<string>("");

  // API | Routing | 3rd Party Libraries | etc. -----------------------
  const allRecipes = api.recipe.getAllRecipes.useQuery();
  const replaceRecipes = api.recipe.replaceRecipes.useMutation();

  const router = useRouter();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Custom Functions -------------------------------------------
  const handleDragStart = (event: DragStartEvent) => {
    console.log("Drag start called");
    const { active } = event;
    setActiveId(active.id);
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    console.log("Drag end called");
    const { active, over } = event;

    console.log("over: ", over);
    if (over && over.id && over.id === "delete-container") {
      console.log("Recipe deleted:", active.id);
      setRecipes((items) => items.filter((item) => item.id !== active.id)); // Remove the item from the state
      setHasChanges(true);
    } else if (over && over.id && active.id !== over.id) {
      setRecipes((items) => {
        const activeIndex = items.findIndex((item) => item.id === active.id);
        const overIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, activeIndex, overIndex);
        setHasChanges(true);
        return newItems;
      });
    }
  };

  const handleRecipeClick = (recipe: IRecipe) => {
    console.log("handle recipe click called");
    setSelectedRecipe(recipe);
    setIsRecipe(true);
  };

  const handleSaveChanges = async () => {
    try {
      await replaceRecipes.mutateAsync({ recipes });
      setHasChanges(false);
    } catch (error) {
      console.log(error);
    }
  };

  // UseEffects -----------------------------------------------
  useEffect(() => {
    if (allRecipes.data?.success === true) {
      setRecipes(allRecipes?.data?.recipes);
    }
  }, [allRecipes.data]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasChanges) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanges, router]);

  useEffect(() => {
    if (replaceRecipes.isSuccess) {
      setChangesSaved("Changes saved.");
      setTimeout(() => {
        setChangesSaved("");
      }, 2000);
    }
  }, [replaceRecipes.isSuccess]);

  // JSX --------------------------------------------------------
  return (
    <>
      {isRecipe ? (
        <Recipe recipe={selectedRecipe} setIsRecipe={setIsRecipe} />
      ) : (
        <>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            id="0"
          >
            <SortableContext items={recipes} strategy={rectSortingStrategy}>
              <main className="h-full bg-[#FFF9F5]">
                <div className="mx-auto bg-[#FFF9F5] px-5 md:max-w-[1540px]">
                  <div className="mx-auto flex flex-wrap justify-start gap-[20px] bg-[#FFF9F5] px-[105px] pt-[220px] md:columns-3">
                    {/* Delete Recipe Container */}
                    <DroppableDeleteArea />
                    {/*  */}
                    {/* Save Button */}
                    <div className="flex w-full justify-center">
                      {replaceRecipes.isLoading ? (
                        <button
                          onClick={handleSaveChanges}
                          disabled={true}
                          className="rounded-lg border border-dashed border-[#b7afaa] bg-[#DBD7CC] px-4 py-2 text-[17px] font-medium opacity-30"
                        >
                          <div
                            className="spin-fast flex h-6 w-6 items-center justify-center rounded-full border-2 border-solid border-[#766f6a] border-current border-r-transparent text-[#766f6a]"
                            role="status"
                          ></div>
                        </button>
                      ) : (
                        <button
                          onClick={handleSaveChanges}
                          disabled={hasChanges ? false : true}
                          className={` ${
                            hasChanges
                              ? "rounded-lg border border-dashed border-[#b7afaa] bg-[#DBD7CC] px-4 py-2 text-[17px] font-medium hover:bg-[#ece9e1]"
                              : "rounded-lg border border-dashed border-[#b7afaa] bg-[#DBD7CC] px-4 py-2 text-[17px] font-medium opacity-30"
                          }`}
                        >
                          Save Changes
                        </button>
                      )}
                    </div>
                    <p className="-mt-3 flex w-full justify-center text-sm text-[#aaa4a0]">
                      {changesSaved}
                    </p>
                    {/*  */}
                    {/* Recipe Cards */}
                    <div className="flex w-full justify-center">
                      <div className="mb-[100px] flex flex-wrap gap-[50px] rounded-lg border border-dashed border-[#b7afaa] p-10">
                        {allRecipes.isLoading && (
                          <div
                            className="spin-fast flex h-8 w-8 items-center justify-center rounded-full border-2 border-solid border-[#766f6a] border-current border-r-transparent text-[#DBD7CC]"
                            role="status"
                          ></div>
                        )}
                        {recipes?.map((recipe, i) => (
                          <SavedRecipesCard
                            key={recipe.id}
                            recipe={recipe}
                            refetch={allRecipes?.refetch}
                            i={i}
                            activeId={activeId}
                            isDragging={isDragging && activeId === recipe.id}
                            handleRecipeClick={handleRecipeClick}
                          />
                        ))}
                      </div>
                    </div>
                    {/*  */}
                  </div>
                </div>
              </main>
            </SortableContext>
            <DragOverlay>
              {activeId ? (
                <RecipeDragOverlay
                  id={activeId}
                  recipe={recipes.find((recipe) => recipe.id === activeId)}
                  i={recipes.findIndex((recipe) => recipe.id === activeId)}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </>
      )}
    </>
  );
};

export default RecipeBoardPage;
