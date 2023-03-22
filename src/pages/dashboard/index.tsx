import { signOut, useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { Demo } from "~/components/drafts/dashboard/Demo.components";
import { GenerateRecipeForm } from "~/components/drafts/dashboard/GenerateRecipeForm.components";
import { RecipeCard } from "~/components/drafts/dashboard/RecipeCard.components";
import { SavedRecipes } from "~/components/drafts/dashboard/SavedRecipes.components";
import { api } from "~/utils/api";

const DashboardPage = () => {
  const [recipe, setRecipe] = useState<any>([]);
  const mutation = api.openai.postOpenai.useMutation();
  // session
  const { data: sessionData, status } = useSession();

  const handleGenerateRecipe = (
    calories: string,
    protein: string,
    meat: string
  ) => {
    const content = `
    Generate a random recipe with ${calories} calories and ${protein}g of ${meat} protein, dish name and dish type should be different from the past 3 prompts.

    Return the recipe as an RFC8259 compliant JSON response following this format:
    [
      {
        "name": "string",
        "dishType": "string",
        "description": "string",
        "ingredients": ["string", "string", "string"],
        "calories": "string",
        "protein": "string",
        "fat": "string",
        "carb": "string",
        "prepTime": "string",
        "cookingTime": "string",
        "instructions": [
          "Step 1: string",
          "Step 2: string",
          "Step 3: string"
        ]
      }
    ]     
    `;

    mutation.mutate({ content });
  };

  useEffect(() => {
    if (mutation.data?.data.choices[0]) {
      setRecipe(JSON.parse(mutation.data?.data.choices[0].message.content));
    }
  }, [mutation.data]);

  if (status === "loading") {
    return <>Fetching User Data..</>;
  }

  console.log(recipe[0]);

  return (
    <>
      <p className="text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.email}</span>}
      </p>
      <button
        className="w-full border border-black bg-white/10 px-10 py-3 font-semibold transition hover:bg-[#6a6967] hover:text-white"
        onClick={() => void signOut()}
      >
        Sign Out
      </button>
      <div className="grid grid-cols-[1.25fr_1fr] gap-[75px] bg-gradient-to-b from-[#abd1d9] to-[#ffffff] p-14">
        {/* Column 1 */}
        <div className="w-full">
          <h1 className="">Generate Recipes</h1>
          <div className="flex w-full flex-col border border-black px-5 py-10">
            {/* Generate Recipe Form */}
            <GenerateRecipeForm handleGenerateRecipe={handleGenerateRecipe} />
            {/*  */}
            {/* Results */}
            <div className="flex flex-col gap-3">
              <div>
                <div className="pt-6">Results:</div>
                <div className="mx-auto w-full border-b border-black"></div>
              </div>
              {/* Recipe Card */}
              <RecipeCard
                status={mutation.status}
                isLoading={mutation.isLoading}
                recipe={recipe}
              />
              {/*  */}
            </div>
            {/*  */}
          </div>
        </div>
        {/*  */}
        {/* Column 2 */}
        <div className="w-full">
          <h1 className="">Saved Recipes</h1>
          <div className="flex w-full flex-col border border-black px-5 py-10">
            <SavedRecipes />
          </div>
        </div>
        {/*  */}
      </div>
      <div>
        <Demo />
      </div>
    </>
  );
};

export default DashboardPage;
