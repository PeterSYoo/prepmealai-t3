import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { api } from "~/utils/api";

export const GeneratedRecipe = ({ recipe }: { recipe: any }) => {
  const postRecipe = api.recipe.postRecipe.useMutation();
  // session

  const handleSave = () => {
    postRecipe.mutate({ ...recipe[0] });
  };

  return (
    <>
      <main className="grid h-full w-full grid-rows-[288px_1fr] bg-[#FFF9F5]">
        {/* Row 1 */}
        <header className="bg-[url('https://res.cloudinary.com/dryh1nvhk/image/upload/v1678934510/PrepMeal%20AI/Recipe/soup_wf5odn.png')] bg-cover bg-center bg-no-repeat">
          <div className="flex h-full w-full items-end justify-start pb-[35px] pl-[35px]">
            <button className="flex items-center gap-3 rounded-lg bg-[#FFF9F5] px-5 py-[8px] font-bold shadow-[3px_3px_5px_1px] shadow-black/60">
              <AiOutlineHeart className="text-xl" />
              SAVE RECIPE
            </button>
          </div>
        </header>
        {/*  */}
        {/* Row 2 */}
        <section className="bg-[url('https://res.cloudinary.com/dryh1nvhk/image/upload/v1678934952/PrepMeal%20AI/Recipe/bg_lqbddt.png')] bg-cover bg-center bg-no-repeat">
          {/* Nutrition info */}
          <div className="absolute top-[220px] left-2/3 z-10 grid h-[640px] w-[464px] grid-rows-[100px_1fr] rounded-[15px] border-2 border-[#D9CCC3] bg-[#FFF9F5] shadow-[0_10px_30px_1px] shadow-black/50">
            <div className="bg-[url('https://res.cloudinary.com/dryh1nvhk/image/upload/v1678934903/PrepMeal%20AI/Recipe/nutrition-header_s9x0fq.png')] bg-cover bg-center bg-no-repeat">
              <div className="flex justify-center pt-11">
                <Image
                  src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1678937730/PrepMeal%20AI/Recipe/prepping_hijwz5.png"
                  alt="prepping"
                  height={115}
                  width={115}
                  className="rounded-full border border-[#D9CCC3]"
                />
              </div>
              {/* Nutrition and Prepping information */}
              <div className="flex flex-col gap-[22px] pt-[28px] pl-[48px]">
                {/* Calories */}
                <div className="flex items-center gap-[22px]">
                  <div>
                    <Image
                      src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1678934923/PrepMeal%20AI/Recipe/bulletpoint_im1xc4.png"
                      alt="bullet point"
                      height={44}
                      width={38}
                    />
                  </div>
                  <p className="flex items-center gap-3 text-[26px]">
                    Calories:
                    <span className="text-[#676767]">
                      {recipe[0]?.calories}
                    </span>
                  </p>
                </div>
                {/*  */}
                {/* Protein */}
                <div className="flex items-center gap-[22px]">
                  <div>
                    <Image
                      src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1678934923/PrepMeal%20AI/Recipe/bulletpoint_im1xc4.png"
                      alt="bullet point"
                      height={44}
                      width={38}
                    />
                  </div>
                  <p className="flex items-center gap-3 text-[26px]">
                    Protein:
                    <span className="text-[#676767]">{recipe[0]?.protein}</span>
                  </p>
                </div>
                {/*  */}
                {/* Fat */}
                <div className="flex items-center gap-[22px]">
                  <div>
                    <Image
                      src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1678934923/PrepMeal%20AI/Recipe/bulletpoint_im1xc4.png"
                      alt="bullet point"
                      height={44}
                      width={38}
                    />
                  </div>
                  <p className="flex items-center gap-3 text-[26px]">
                    Fat:
                    <span className="text-[#676767]">{recipe[0]?.fat}</span>
                  </p>
                </div>
                {/*  */}
                {/* Carb */}
                <div className="flex items-center gap-[22px]">
                  <div>
                    <Image
                      src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1678934923/PrepMeal%20AI/Recipe/bulletpoint_im1xc4.png"
                      alt="bullet point"
                      height={44}
                      width={38}
                    />
                  </div>
                  <p className="flex items-center gap-3 text-[26px]">
                    Carb:
                    <span className="text-[#676767]">{recipe[0]?.carb}</span>
                  </p>
                </div>
                {/*  */}
                {/* Line Break */}
                <div className="w-[350px] border-b-2 border-black/30"></div>
                {/*  */}
                {/* Prep */}
                <div className="flex items-center gap-[22px]">
                  <div>
                    <Image
                      src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1678934923/PrepMeal%20AI/Recipe/bulletpoint_im1xc4.png"
                      alt="bullet point"
                      height={44}
                      width={38}
                    />
                  </div>
                  <p className="flex items-center gap-3 text-[26px]">
                    Prep:
                    <span className="text-[#676767]">
                      {recipe[0]?.prepTime}
                    </span>
                  </p>
                </div>
                {/*  */}
                {/* Cook */}
                <div className="flex items-center gap-[22px]">
                  <div>
                    <Image
                      src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1678934923/PrepMeal%20AI/Recipe/bulletpoint_im1xc4.png"
                      alt="bullet point"
                      height={44}
                      width={38}
                    />
                  </div>
                  <p className="flex items-center gap-3 text-[26px]">
                    Cook:
                    <span className="text-[#676767]">
                      {recipe[0]?.cookingTime}
                    </span>
                  </p>
                </div>
                {/*  */}
              </div>
              {/*  */}
            </div>
          </div>
          {/*  */}
          <div className="flex h-full w-full flex-col gap-[28px] px-10 pt-[86px]">
            {/* Name */}
            <div className="grid grid-cols-[280px_46px_700px]">
              <h1 className="flex justify-end text-[26px] font-bold">Name:</h1>
              <div></div>
              <p className="text-[26px]">{recipe[0]?.name}</p>
            </div>
            {/*  */}
            {/* Dish Type */}
            <div className="grid grid-cols-[280px_46px_700px]">
              <h1 className="flex justify-end text-[26px] font-bold">
                Dish Type:
              </h1>
              <div></div>
              <p className="text-[26px]">{recipe[0]?.dishType}</p>
            </div>
            {/*  */}
            {/* Protein Choice */}
            <div className="grid grid-cols-[280px_46px_700px]">
              <h1 className="flex justify-end text-[26px] font-bold">
                Protein Choice:
              </h1>
              <div></div>
              <p className="text-[26px]">{recipe[0]?.proteinChoice}</p>
            </div>
            {/*  */}
            {/* Description */}
            <div className="grid grid-cols-[280px_46px_700px]">
              <h1 className="flex justify-end text-[26px] font-bold">
                Description:
              </h1>
              <div></div>
              <p className="text-[26px]">{recipe[0]?.description}</p>
            </div>
            {/*  */}
            {/* Ingredients */}
            <div className="grid grid-cols-[280px_46px_700px]">
              <h1 className="flex justify-end text-[26px] font-bold">
                Ingredients:
              </h1>
              <div></div>
              <p className="text-[26px]">
                <ul className="flex list-disc flex-col gap-1 pl-7">
                  {recipe[0]?.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </p>
            </div>
            {/*  */}
            {/* Instructions */}
            <div className="grid grid-cols-[280px_46px_700px] pb-[300px]">
              <h1 className="flex justify-end text-[26px] font-bold">
                Instructions:
              </h1>
              <div></div>
              <p className="text-[26px]">
                <ol className="flex flex-col gap-10">
                  {recipe[0]?.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </p>
            </div>
            {/*  */}
          </div>
        </section>
        {/*  */}
      </main>
    </>
  );
};
