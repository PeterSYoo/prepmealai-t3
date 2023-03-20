import { Fragment } from "react";
import { api } from "~/utils/api";

export const SavedRecipes = () => {
  const allRecipes = api.recipe.getAllRecipes.useQuery();

  console.log({ allRecipes: allRecipes?.data?.recipes });

  return (
    <>
      <div className="">
        <div className="flex flex-col gap-8"></div>
      </div>
    </>
  );
};
