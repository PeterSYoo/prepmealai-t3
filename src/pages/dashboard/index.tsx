import { signOut, useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { Demo } from "~/components/dashboard/Demo.components";
import { GenerateRecipeForm } from "~/components/dashboard/GenerateRecipeForm.components";
import { RecipeCard } from "~/components/dashboard/RecipeCard.components";
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
    Create a random recipe with ${calories} calories and ${protein}g of ${meat} protein.
    Do not include any explanations, only provide a  RFC8259 compliant JSON response  following this format without deviation.
    [
      {
        "name": "name of recipe",
        "dishType": "type of dish",
        "description": "description of recipe",
        "ingredients": ["ingredient 1", "ingredient 2", "ingredient 3", "etc"],
        "calories": "number of calories",
        "protein": "number of protein by gram",
        "fat": "number of fat by gram",
        "carb": "number of carb by gram",
        "prepTime": "preperation time",
        "cookingTime": "cooking time",
        "instructions": [
          {
            "step 1": "step 1 instructions",
            "step 2": "step 2 instructions",
            "step 3": "step 3 instructions",
            "step 4": "etc."
          }
        ]
      }
    ]    
    The JSON response:
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

  console.log({ recipe });

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
              <RecipeCard recipe={recipe} />
              {/*  */}
            </div>
            {/*  */}
          </div>
        </div>
        {/*  */}
        {/* Column 2 */}
        <div className="w-full">
          <h1 className="">Saved Recipes</h1>
          <div className="w-full border border-black">Test</div>
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
