export const RecipeCard = () => {
  return (
    <>
      <div className="flex w-full flex-col gap-3 border border-black bg-white p-3 text-sm">
        {/* Name */}
        <div className="grid grid-cols-[135px_1fr]">
          <p className="font-medium">Name:</p>
          <p>Beef and Broccoli Stir-Fry with Brown Rice</p>
        </div>
        {/*  */}
        {/* Type of Dish */}
        <div className="grid grid-cols-[135px_1fr]">
          <p className="font-medium">Dish Type:</p>
          <p>Stir-fry</p>
        </div>
        {/*  */}
        {/* Description */}
        <div className="grid grid-cols-[135px_1fr]">
          <p className="font-medium">Description:</p>
          <p>
            This dish is a protein-packed, nutritious meal that is perfect for a
            quick and easy dinner. Tender strips of beef are stir-fried with
            broccoli and served over brown rice for a delicious and filling
            meal.
          </p>
        </div>
        {/*  */}
        {/* Ingredients */}
        <div className="grid grid-cols-[135px_1fr]">
          <p className="font-medium">Ingredients:</p>
          <ul className="flex list-disc flex-col gap-1 pl-5">
            <li>1 lb beef sirloin, sliced into thin strips</li>
            <li>2 cups broccoli florets</li>
            <li>1 red bell pepper, sliced</li>
            <li>1 onion, sliced</li>
            <li>3 cloves garlic, minced</li>
            <li>1 tablespoon vegetable oil</li>
            <li>1 tablespoon soy sauce</li>
            <li>1 tablespoon cornstarch</li>
            <li>1 teaspoon sugar</li>
            <li>1/2 teaspoon salt</li>
            <li>1/4 teaspoon black pepper</li>
            <li>2 cups cooked brown rice</li>
          </ul>
        </div>
        {/*  */}
        {/* Calories */}
        <div className="grid grid-cols-[135px_1fr]">
          <p className="font-medium">Calories:</p>
          <p>501</p>
        </div>
        {/*  */}
        {/* Protein */}
        <div className="grid grid-cols-[135px_1fr]">
          <p className="font-medium">Protein:</p>
          <p>53g</p>
        </div>
        {/*  */}
        {/* Fat */}
        <div className="grid grid-cols-[135px_1fr]">
          <p className="font-medium">Fat:</p>
          <p>14g</p>
        </div>
        {/*  */}
        {/* Carbohydrates */}
        <div className="grid grid-cols-[135px_1fr]">
          <p className="font-medium">Carbohydrates:</p>
          <p>38g</p>
        </div>
        {/*  */}
        {/* Preparation Time */}
        <div className="grid grid-cols-[135px_1fr]">
          <p className="font-medium">Preparation Time:</p>
          <p>15 minutes</p>
        </div>
        {/*  */}
        {/* Cooking Time */}
        <div className="grid grid-cols-[135px_1fr]">
          <p className="font-medium">Cooking Time:</p>
          <p>10 minutes</p>
        </div>
        {/*  */}
        {/* Instructions */}
        <div className="grid grid-cols-[135px_1fr]">
          <p className="font-medium">Instructions:</p>
          <ol className="flex list-decimal flex-col gap-1 pl-5">
            <li>
              In a small bowl, whisk together the soy sauce, cornstarch, sugar,
              salt, and black pepper.
            </li>
            <li>
              In a large skillet or wok, heat the vegetable oil over high heat.
            </li>
            <li>
              Add the beef strips and stir-fry for 2-3 minutes, until browned
              and cooked through.
            </li>
            <li>Remove the beef from the skillet and set aside.</li>
            <li>
              Add the broccoli, red bell pepper, onion, and garlic to the
              skillet and stir-fry for 3-4 minutes, until the vegetables are
              tender.
            </li>
            <li>
              Add the beef back to the skillet and pour the soy sauce mixture
              over everything. Stir-fry for an additional 1-2 minutes, until the
              sauce has thickened and everything is coated.
            </li>
            <li>
              Serve the beef and broccoli stir-fry over cooked brown rice.
            </li>
          </ol>
        </div>
        {/*  */}
      </div>
      <div className="flex w-full justify-end">
        <button className="border border-black bg-white px-4 py-1 font-semibold transition hover:bg-[#6a6967] hover:text-white">
          Save
        </button>
      </div>
    </>
  );
};
