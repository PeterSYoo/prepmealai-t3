import type { IRecipe } from "additional";
import Image from "next/image";
import { VscDebugStepBack } from "react-icons/vsc";

export const Recipe = ({
  recipe,
  setIsRecipe,
}: {
  recipe: IRecipe | null;
  setIsRecipe: (arg0: boolean) => void;
}) => {
  // JSX ------------------------------------------------------------------ ***
  return (
    <>
      <section className="grid h-screen w-full grid-rows-[288px_1fr]">
        {/* Row 1 */}
        <header
          className={
            (recipe?.proteinChoice.includes("Pork") &&
              `bg-[url('https://res.cloudinary.com/dryh1nvhk/image/upload/v1678954528/PrepMeal%20AI/Recipe/pork_jhfy8v.png')] bg-cover bg-center bg-no-repeat`) ||
            (recipe?.proteinChoice.includes("Chicken") &&
              `bg-[url('https://res.cloudinary.com/dryh1nvhk/image/upload/v1678954221/PrepMeal%20AI/Recipe/chicken_zzcbbh.png')] bg-cover bg-center bg-no-repeat`) ||
            (recipe?.proteinChoice.includes("Beef") &&
              `bg-[url('https://res.cloudinary.com/dryh1nvhk/image/upload/v1678954353/PrepMeal%20AI/Recipe/beef_oexrh2.png')] bg-cover bg-center bg-no-repeat`) ||
            (recipe?.proteinChoice.includes("Turkey") &&
              `bg-[url('https://res.cloudinary.com/dryh1nvhk/image/upload/v1678954631/PrepMeal%20AI/Recipe/turkey_xpcgwb.png')] bg-cover bg-center bg-no-repeat`) ||
            (recipe?.proteinChoice.includes("Fish") &&
              `bg-[url('https://res.cloudinary.com/dryh1nvhk/image/upload/v1678955785/PrepMeal%20AI/Recipe/fish_ifcdyp.png`) ||
            (recipe?.proteinChoice.includes("Plant") &&
              `bg-[url('https://res.cloudinary.com/dryh1nvhk/image/upload/v1678954829/PrepMeal%20AI/Recipe/lentil_fvkiv2.png`) ||
            (recipe?.proteinChoice.includes("Lentil") &&
              `bg-[url('https://res.cloudinary.com/dryh1nvhk/image/upload/v1678954829/PrepMeal%20AI/Recipe/lentil_fvkiv2.png`) ||
            (recipe?.proteinChoice.includes("Egg") &&
              `bg-[url('https://res.cloudinary.com/dryh1nvhk/image/upload/v1678954708/PrepMeal%20AI/Recipe/egg_c0dzzn.png')] bg-cover bg-center bg-no-repeat`) ||
            `bg-[url('https://res.cloudinary.com/dryh1nvhk/image/upload/v1678934510/PrepMeal%20AI/Recipe/soup_wf5odn.png')] bg-cover bg-center bg-no-repeat`
          }
        >
          <div className="mx-auto flex h-full w-full max-w-[1440px] items-end justify-start pb-[35px] pl-[35px]">
            <button
              onClick={() => setIsRecipe(false)}
              className="z-10 flex items-center gap-3 rounded-lg border border-[#D9CCC3] bg-white/60 px-5 py-[8px] font-bold backdrop-blur-[2px] hover:bg-[#FFF9F5]"
            >
              <VscDebugStepBack className="text-xl" />
              BACK TO RECIPE BOARD
            </button>
          </div>
        </header>
        {/*  */}
        {/* Row 2 */}
        <section className="bg-[#FFF9F5] bg-[url('https://res.cloudinary.com/dryh1nvhk/image/upload/v1678960055/PrepMeal%20AI/Recipe/bg-shapes_qte5dl.png')] bg-cover bg-center bg-no-repeat pt-[590px] md:px-5 md:pt-0">
          <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col md:grid md:grid-cols-[1fr_370px]">
            {/* Column 1 */}
            <div className="h-full w-full gap-[28px] px-10 pt-[86px]">
              {/* Name */}
              <div className="flex break-words pb-8">
                <h1 className="w-full max-w-[250px] text-xl font-bold">
                  Name:
                </h1>
                <p className="text-xl">{recipe?.name}</p>
              </div>
              {/*  */}
              {/* Dish Type */}
              <div className="flex break-words pb-8">
                <h1 className="w-full max-w-[250px] text-xl font-bold">
                  Dish Type:
                </h1>
                <p className="text-xl">{recipe?.dishType}</p>
              </div>
              {/*  */}
              {/* Protein Choice */}
              <div className="flex break-words pb-8">
                <h1 className="w-full max-w-[250px] text-xl font-bold">
                  Protein Choice:
                </h1>
                <p className="text-xl">{recipe?.proteinChoice}</p>
              </div>
              {/*  */}
              {/* Description */}
              <div className="flex break-words pb-8">
                <h1 className="w-full max-w-[250px] text-xl font-bold">
                  Description:
                </h1>
                <span className="text-xl">{recipe?.description}</span>
              </div>
              {/*  */}
              {/* Ingredients */}
              <div className="flex break-words pb-8">
                <h1 className="w-full max-w-[250px] text-xl font-bold">
                  Ingredients:
                </h1>
                <ul className="flex list-disc flex-col gap-4 pl-5 text-xl">
                  {recipe?.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              {/*  */}
              {/* Instructions */}
              <div className="flex break-words pb-[150px]">
                <h1 className="w-full max-w-[250px] text-xl font-bold">
                  Instructions:
                </h1>
                <ul className="flex list-disc flex-col gap-10 text-xl">
                  {recipe?.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>
              </div>
              {/*  */}
            </div>
            {/* Column 2 */}
            {/* Nutrition info */}
            <div className="absolute top-[320px] grid h-[570px] w-[364px] grid-rows-[100px_1fr] rounded-[15px] border-2 border-[#D9CCC3] bg-[#FFF9F5] shadow-[0_10px_30px_1px] shadow-black/50 md:static md:float-right md:-mt-16">
              <div className="w-[360px] rounded-t-[15px] bg-[url('https://res.cloudinary.com/dryh1nvhk/image/upload/v1678934903/PrepMeal%20AI/Recipe/nutrition-header_s9x0fq.png')] bg-cover bg-center bg-no-repeat">
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
                        src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1678953684/PrepMeal%20AI/Recipe/bullet_x5yrq2.png"
                        alt="bullet point"
                        height={20}
                        width={21}
                      />
                    </div>
                    <p className="flex items-center gap-3 text-xl">
                      Calories:
                      <span className="text-[#676767]">{recipe?.calories}</span>
                    </p>
                  </div>
                  {/*  */}
                  {/* Protein */}
                  <div className="flex items-center gap-[22px]">
                    <div>
                      <Image
                        src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1678953684/PrepMeal%20AI/Recipe/bullet_x5yrq2.png"
                        alt="bullet point"
                        height={20}
                        width={21}
                      />
                    </div>
                    <p className="flex items-center gap-3 text-xl">
                      Protein:
                      <span className="text-[#676767]">{recipe?.protein}</span>
                    </p>
                  </div>
                  {/*  */}
                  {/* Fat */}
                  <div className="flex items-center gap-[22px]">
                    <div>
                      <Image
                        src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1678953684/PrepMeal%20AI/Recipe/bullet_x5yrq2.png"
                        alt="bullet point"
                        height={20}
                        width={21}
                      />
                    </div>
                    <p className="flex items-center gap-3 text-xl">
                      Fat:
                      <span className="text-[#676767]">{recipe?.fat}</span>
                    </p>
                  </div>
                  {/*  */}
                  {/* Carb */}
                  <div className="flex items-center gap-[22px]">
                    <div>
                      <Image
                        src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1678953684/PrepMeal%20AI/Recipe/bullet_x5yrq2.png"
                        alt="bullet point"
                        height={20}
                        width={21}
                      />
                    </div>
                    <p className="flex items-center gap-3 text-xl">
                      Carb:
                      <span className="text-[#676767]">{recipe?.carb}</span>
                    </p>
                  </div>
                  {/*  */}
                  {/* Line Break */}
                  <div className="w-[250px] border-b border-black/10"></div>
                  {/*  */}
                  {/* Prep */}
                  <div className="flex items-center gap-[22px]">
                    <div>
                      <Image
                        src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1678953684/PrepMeal%20AI/Recipe/bullet_x5yrq2.png"
                        alt="bullet point"
                        height={20}
                        width={21}
                      />
                    </div>
                    <p className="flex items-center gap-3 text-xl">
                      Prep:
                      <span className="text-[#676767]">{recipe?.prepTime}</span>
                    </p>
                  </div>
                  {/*  */}
                  {/* Cook */}
                  <div className="flex items-center gap-[22px]">
                    <div>
                      <Image
                        src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1678953684/PrepMeal%20AI/Recipe/bullet_x5yrq2.png"
                        alt="bullet point"
                        height={20}
                        width={21}
                      />
                    </div>
                    <p className="flex items-center gap-3 text-xl">
                      Cook:
                      <span className="text-[#676767]">
                        {recipe?.cookingTime}
                      </span>
                    </p>
                  </div>
                  {/*  */}
                </div>
                {/*  */}
              </div>
            </div>
            {/*  */}
          </div>
        </section>
        {/*  */}
      </section>
    </>
  );
};
