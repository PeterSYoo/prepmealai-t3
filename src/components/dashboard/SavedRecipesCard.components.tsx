import { Fragment } from "react";
import { api } from "~/utils/api";

export const SavedRecipesCard = ({
  recipe,
  refetch,
}: {
  recipe: any;
  refetch: any;
}) => {
  const mutation = api.recipe.deleteRecipe.useMutation();

  const handleDelete = async () => {
    await mutation.mutateAsync({ id: recipe?.id });
    refetch();
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex w-full flex-col gap-3 border border-black bg-white p-3 text-sm">
          {/* Name */}
          <div className="grid grid-cols-[135px_1fr]">
            <p className="font-medium">Name:</p>
            <p>{recipe?.name}</p>
          </div>
          {/*  */}
          {/* Type of Dish */}
          <div className="grid grid-cols-[135px_1fr]">
            <p className="font-medium">Dish Type:</p>
            <p>{recipe?.dishType}</p>
          </div>
          {/*  */}
          {/* Description */}
          <div className="grid grid-cols-[135px_1fr]">
            <p className="font-medium">Description:</p>
            <p>{recipe?.description}</p>
          </div>
          {/*  */}
          {/* Ingredients */}
          <div className="grid grid-cols-[135px_1fr]">
            <p className="font-medium">Ingredients:</p>
            <ul className="flex list-disc flex-col gap-1 pl-5">
              {recipe?.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          {/*  */}
          {/* Calories */}
          <div className="grid grid-cols-[135px_1fr]">
            <p className="font-medium">Calories:</p>
            <p>{recipe?.calories}</p>
          </div>
          {/*  */}
          {/* Protein */}
          <div className="grid grid-cols-[135px_1fr]">
            <p className="font-medium">Protein(grams):</p>
            <p>{recipe?.protein}</p>
          </div>
          {/*  */}
          {/* Fat */}
          <div className="grid grid-cols-[135px_1fr]">
            <p className="font-medium">Fat(grams):</p>
            <p>{recipe?.fat}</p>
          </div>
          {/*  */}
          {/* Carbohydrates */}
          <div className="grid grid-cols-[135px_1fr]">
            <p className="font-medium">Carbs(grams):</p>
            <p>{recipe?.carb}</p>
          </div>
          {/*  */}
          {/* Preparation Time */}
          <div className="grid grid-cols-[135px_1fr]">
            <p className="font-medium">Preparation Time:</p>
            <p>{recipe?.prepTime}</p>
          </div>
          {/*  */}
          {/* Cooking Time */}
          <div className="grid grid-cols-[135px_1fr]">
            <p className="font-medium">Cooking Time:</p>
            <p>{recipe?.cookingTime}</p>
          </div>
          {/*  */}
          {/* Instructions */}
          <div className="grid grid-cols-[135px_1fr]">
            <p className="font-medium">Instructions:</p>
            <ol className="flex flex-col gap-1">
              {recipe?.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
          {/*  */}
        </div>
        <div className="flex w-full justify-end">
          <button
            onClick={handleDelete}
            className="border border-black bg-white px-4 py-1 font-semibold transition hover:bg-[#6a6967] hover:text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
