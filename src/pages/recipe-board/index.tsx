import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { Fragment, useEffect, useState } from "react";
import { SavedRecipesCard } from "~/components/dashboard/SavedRecipesCard.components";
import { api } from "~/utils/api";

const RecipeBoardPage = () => {
  const [recipes, setRecipes] = useState<any>([]);
  const allRecipes = api.recipe.getAllRecipes.useQuery();

  const handleDragEnd = (event: any) => {
    console.log("Drag end called");
    const { active, over } = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER :" + over.id);

    if (active.id !== over.id) {
      setRecipes((items: any) => {
        const activeIndex = items.findIndex((item) => item.id === active.id);
        const overIndex = items.findIndex((item) => item.id === over.id);
        console.log({ activeIndex });
        console.log({ overIndex });

        const newItems = arrayMove(items, activeIndex, overIndex);
        return newItems;
      });
    }
  };

  useEffect(() => {
    if (allRecipes.data?.success === true) {
      setRecipes(allRecipes?.data?.recipes);
    }
  }, [allRecipes.data]);

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <main className="h-full bg-[#FFF9F5]">
          <div className="mx-auto bg-[#FFF9F5] px-5 md:max-w-[1440px]">
            <div className="mx-auto flex flex-wrap justify-start gap-[50px] bg-[#FFF9F5] px-[105px] pt-[220px] md:columns-3">
              {/* Delete Recipe Container */}
              <div className="fixed top-0 left-0 z-0 w-full rounded-b-[25px]">
                <div className="flex h-[150px] items-center justify-center rounded-b-[25px] border-b border-dashed border-[#534941] bg-[#DBD7CC]">
                  <h1 className="font-bold text-[#000000]">
                    Drag here to delete a recipe.
                  </h1>
                </div>
              </div>
              {/*  */}
              {/* Recipe Cards */}
              <div className="flex flex-wrap justify-center gap-[50px]">
                <SortableContext items={recipes} strategy={rectSortingStrategy}>
                  {recipes?.map((recipe, i) => (
                    <SavedRecipesCard
                      key={recipe.id}
                      recipe={recipe}
                      refetch={allRecipes?.refetch}
                      i={i}
                    />
                  ))}
                  {/* Add empty placeholders to align last row to start */}
                  {recipes &&
                    [...Array(Math.max(0, 3 - (recipes.length % 3)))].map(
                      (_, i) => (
                        <div
                          key={`placeholder-${i}`}
                          style={{ flexBasis: "34.33%" }}
                        ></div>
                      )
                    )}
                </SortableContext>
              </div>
              {/*  */}
            </div>
          </div>
        </main>
      </DndContext>
    </>
  );
};

export default RecipeBoardPage;
