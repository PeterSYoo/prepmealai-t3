import { signOut } from "next-auth/react";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import { GenerateRecipeForm } from "~/components/recipe/GenerateRecipeForm.components";
import { GeneratingRecipe } from "~/components/recipe/GeneratingRecipe.components";
import { GeneratedRecipe } from "~/components/recipe/GeneratedRecipe.components";

const RecipePage = () => {
  const [recipe, setRecipe] = useState<any>([]);
  const [isForm, setIsForm] = useState<boolean>(true);

  const mutation = api.openai.postOpenai.useMutation();

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
        "proteinChoice: "string",
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

  return (
    <>
      <main className="flex h-full flex-col items-center justify-center bg-[#FFF9F5]">
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
        {/* Generated Recipe */}
        {mutation.status === "success" && <GeneratedRecipe recipe={recipe} />}
        {/*  */}
      </main>
    </>
  );
};

export default RecipePage;
