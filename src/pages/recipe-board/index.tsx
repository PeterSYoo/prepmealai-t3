import {
  DndContext,
  closestCenter,
  useDroppable,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Fragment, useCallback, useEffect, useState } from "react";
import { DroppableDeleteArea } from "~/components/recipe-board/DroppableDeleteArea.components";
import { Recipe } from "~/components/recipe-board/Recipe.components";
import { RecipeDragOverlay } from "~/components/recipe-board/RecipeDragOverlay.components";
import { SavedRecipesCard } from "~/components/recipe-board/SavedRecipesCard.components";
import { api } from "~/utils/api";

const RecipeBoardPage = () => {
  const [isRecipe, setIsRecipe] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<any>(null);
  const [recipes, setRecipes] = useState<any>([]);
  const allRecipes = api.recipe.getAllRecipes.useQuery();
  const deleteRecipe = api.recipe.deleteRecipe.useMutation();

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

  const handleDragStart = (event) => {
    console.log("Drag start called");
    const { active } = event;
    setActiveId(active.id);
    setIsDragging(true);
  };

  const handleDragEnd = async (event: any) => {
    setIsDragging(false);
    console.log("Drag end called");
    const { active, over } = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER :" + over.id);

    console.log("over: ", over);
    if (over && over.id === "delete-container") {
      console.log("Recipe deleted:", active.id);
      setRecipes((items: any) =>
        items.filter((item: any) => item.id !== active.id)
      ); // Remove the item from the state
    } else if (active.id !== over.id) {
      setRecipes((items: any) => {
        const activeIndex = items.findIndex(
          (item: any) => item.id === active.id
        );
        const overIndex = items.findIndex((item: any) => item.id === over.id);

        const newItems = arrayMove(items, activeIndex, overIndex);
        return newItems;
      });
    }
  };

  const handleRecipeClick = (recipe: any) => {
    console.log("handle recipe click called");
    setSelectedRecipe(recipe);
    setIsRecipe(true);
  };

  useEffect(() => {
    if (allRecipes.data?.success === true) {
      setRecipes(allRecipes?.data?.recipes);
    }
  }, [allRecipes.data]);

  return (
    <>
      {isRecipe ? (
        <Recipe recipe={selectedRecipe} />
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
                <div className="mx-auto bg-[#FFF9F5] px-5 md:max-w-[1440px]">
                  <div className="mx-auto flex flex-wrap justify-start gap-[50px] bg-[#FFF9F5] px-[105px] pt-[220px] md:columns-3">
                    {/* Delete Recipe Container */}
                    <DroppableDeleteArea />
                    {/*  */}
                    {/* Recipe Cards */}
                    <div className="flex w-full justify-center">
                      <div className="mb-[200px] columns-1 gap-[50px] rounded-lg border border-dashed border-[#b7afaa] p-10 md:columns-3">
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
