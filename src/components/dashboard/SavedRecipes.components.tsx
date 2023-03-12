import { Fragment } from "react";
import { api } from "~/utils/api";
import { SavedRecipesCard } from "./SavedRecipesCard.components";

export const SavedRecipes = () => {
  const allRecipes = api.recipe.getAllRecipes.useQuery();

  console.log({ allRecipes: allRecipes?.data?.recipes });

  return (
    <>
      <div className="">
        <div className="flex flex-col gap-8">
          {allRecipes?.data?.recipes?.map((recipe) => (
            <Fragment key={recipe?.id}>
              <SavedRecipesCard recipe={recipe} refetch={allRecipes?.refetch} />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};
