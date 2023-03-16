import { Fragment } from "react";
import { SavedRecipesCard } from "~/components/dashboard/SavedRecipesCard.components";
import { api } from "~/utils/api";

const RecipeBoardPage = () => {
  const allRecipes = api.recipe.getAllRecipes.useQuery();

  console.log({ allRecipes: allRecipes?.data?.recipes });

  return (
    <>
      <div className="bg-[#FFF9F5]">
        <div className="flex flex-col gap-8 pt-28">
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

export default RecipeBoardPage;
