import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import { GenerateRecipeForm } from "~/components/recipe/GenerateRecipeForm.components";
import { GeneratingRecipe } from "~/components/recipe/GeneratingRecipe.components";
import { GeneratedRecipe } from "~/components/recipe/GeneratedRecipe.components";
import { Error } from "~/components/recipe/Error.components";
import type { IRecipe } from "additional";

const RecipePage = () => {
  // States -------------------------------------------------------
  const [recipe, setRecipe] = useState<IRecipe[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isForm, setIsForm] = useState<boolean>(true);

  // API -------------------------------------------------------
  const mutation = api.openai.postOpenai.useMutation();

  // Custom Functions -------------------------------------------
  const handleGenerateRecipe = (
    calories: string,
    protein: string,
    proteinChoice: string
  ) => {
    const content = `
    Generate a random recipe with ${calories} calories and ${protein}g of ${proteinChoice} protein, dish name and dish type should be different from the past 3 prompts.

    Return the recipe as an RFC8259 compliant JSON response following this format:
    [
      {
        "name": "string",
        "dishType": "string",
        "proteinChoice": "string",
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

  // UseEffects -------------------------------------------------------
  useEffect(() => {
    if (mutation.data?.success === false) {
      setIsError(true);
    } else if (mutation.data?.success === true) {
      const parsedData = JSON.parse(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        mutation.data?.data.choices[0].message.content
      ) as IRecipe[];
      setRecipe(parsedData);
    }
  }, [mutation.data]);

  // JSX -------------------------------------------------------
  return (
    <>
      <main className="flex h-screen flex-col items-center justify-center bg-[#FFF9F5]">
        {/* Recipe Generator Form */}
        {isForm && (
          <GenerateRecipeForm
            setIsForm={setIsForm}
            handleGenerateRecipe={handleGenerateRecipe}
          />
        )}
        {/*  */}
        {/* Generating Recipe */}
        {mutation.status === "loading" && <GeneratingRecipe />}
        {/*  */}
        {/* If Error */}
        {isError && <Error setIsError={setIsError} setIsForm={setIsForm} />}
        {/*  */}
        {/* Generated Recipe */}
        {mutation.data?.success === true && <GeneratedRecipe recipe={recipe} />}
        {/*  */}
      </main>
    </>
  );
};

export default RecipePage;
