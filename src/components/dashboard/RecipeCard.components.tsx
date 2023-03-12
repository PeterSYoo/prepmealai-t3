import { api } from "~/utils/api";

export const RecipeCard = ({
  recipe,
  isLoading,
  status,
}: {
  recipe: any;
  isLoading: any;
  status: any;
}) => {
  const mutation = api.recipe.postRecipe.useMutation();
  // session

  const handleSave = () => {
    mutation.mutate({ ...recipe[0] });
  };

  console.log({ mutation });

  return (
    <>
      {isLoading ? (
        <>Loading Recipe...</>
      ) : (
        <>
          {status === "success" && (
            <>
              <div className="flex w-full flex-col gap-3 border border-black bg-white p-3 text-sm">
                {/* Name */}
                <div className="grid grid-cols-[135px_1fr]">
                  <p className="font-medium">Name:</p>
                  <p>{recipe[0]?.name}</p>
                </div>
                {/*  */}
                {/* Type of Dish */}
                <div className="grid grid-cols-[135px_1fr]">
                  <p className="font-medium">Dish Type:</p>
                  <p>{recipe[0]?.dishType}</p>
                </div>
                {/*  */}
                {/* Description */}
                <div className="grid grid-cols-[135px_1fr]">
                  <p className="font-medium">Description:</p>
                  <p>{recipe[0]?.description}</p>
                </div>
                {/*  */}
                {/* Ingredients */}
                <div className="grid grid-cols-[135px_1fr]">
                  <p className="font-medium">Ingredients:</p>
                  <ul className="flex list-disc flex-col gap-1 pl-5">
                    {recipe[0]?.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                {/*  */}
                {/* Calories */}
                <div className="grid grid-cols-[135px_1fr]">
                  <p className="font-medium">Calories:</p>
                  <p>{recipe[0]?.calories}</p>
                </div>
                {/*  */}
                {/* Protein */}
                <div className="grid grid-cols-[135px_1fr]">
                  <p className="font-medium">Protein(grams):</p>
                  <p>{recipe[0]?.protein}</p>
                </div>
                {/*  */}
                {/* Fat */}
                <div className="grid grid-cols-[135px_1fr]">
                  <p className="font-medium">Fat(grams):</p>
                  <p>{recipe[0]?.fat}</p>
                </div>
                {/*  */}
                {/* Carbohydrates */}
                <div className="grid grid-cols-[135px_1fr]">
                  <p className="font-medium">Carbs(grams):</p>
                  <p>{recipe[0]?.carb}</p>
                </div>
                {/*  */}
                {/* Preparation Time */}
                <div className="grid grid-cols-[135px_1fr]">
                  <p className="font-medium">Preparation Time:</p>
                  <p>{recipe[0]?.prepTime}</p>
                </div>
                {/*  */}
                {/* Cooking Time */}
                <div className="grid grid-cols-[135px_1fr]">
                  <p className="font-medium">Cooking Time:</p>
                  <p>{recipe[0]?.cookingTime}</p>
                </div>
                {/*  */}
                {/* Instructions */}
                <div className="grid grid-cols-[135px_1fr]">
                  <p className="font-medium">Instructions:</p>
                  <ol className="flex flex-col gap-1">
                    {recipe[0]?.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>
                {/*  */}
              </div>
              <div className="flex w-full justify-end">
                <button
                  onClick={handleSave}
                  className="border border-black bg-white px-4 py-1 font-semibold transition hover:bg-[#6a6967] hover:text-white"
                >
                  Save
                </button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
