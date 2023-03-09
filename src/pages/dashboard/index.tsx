import { signOut, useSession } from "next-auth/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Inputs = {
  calories: string;
  protein: string;
  meat: string;
};

// Type for the form schema
type FormSchemaType = z.infer<typeof FormSchema>;
const FormSchema = z.object({
  calories: z
    .string()
    .regex(/^\d+$/, { message: "Calories must be a valid number." }),
  protein: z
    .string()
    .regex(/^\d+$/, { message: "Protein must be a valid number." }),
  meat: z.string(),
});

const DashboardPage = () => {
  // session
  const { data: sessionData, status } = useSession();

  // Use the useForm hook to handle the form state and validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  } = useForm<FormSchemaType>({ resolver: zodResolver(FormSchema) });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  if (status === "loading") {
    return <>Fetching User Data..</>;
  }

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
            <form
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto flex w-full max-w-[500px] flex-col gap-5 border border-black px-5 py-5"
            >
              {/* Calories */}
              <label className="w-full">
                <p className="">Calories:</p>
                <input
                  {...register("calories")}
                  placeholder="0"
                  type="text"
                  className="w-full border border-black p-1 focus:outline-none"
                />
                {errors.calories && (
                  <p className="text-sm text-red-600">
                    {errors.calories.message}
                  </p>
                )}
              </label>
              {/*  */}
              {/* Protein */}
              <label className="w-full">
                <p className="">Protein(grams):</p>
                <input
                  {...register("protein")}
                  placeholder="0"
                  type="text"
                  className="w-full border border-black p-1 focus:outline-none"
                />
                {errors.protein && (
                  <p className="text-sm text-red-600">
                    {errors.protein.message}
                  </p>
                )}
              </label>
              {/*  */}
              {/* Type of Meat */}
              <label className="">
                <p className="">Type of Meat:</p>
                <select
                  {...register("meat")}
                  className="w-full border border-black p-1 focus:outline-none"
                >
                  <option value="chicken">Chicken</option>
                  <option value="beef">Beef</option>
                  <option value="pork">Pork</option>
                  <option value="turkey">Turkey</option>
                </select>
              </label>
              {/*  */}
              {/* Submit Button */}
              <div className="flex w-full justify-end">
                <button
                  type="submit"
                  className="border border-black bg-white px-4 py-1 font-semibold transition hover:bg-[#6a6967] hover:text-white"
                >
                  Submit
                </button>
              </div>
            </form>
            {/*  */}
            {/* Results */}
            <div className="flex flex-col gap-3">
              <div>
                <div className="pt-6">Results:</div>
                <div className="mx-auto w-full border-b border-black"></div>
              </div>
              <div className="flex w-full flex-col gap-3 border border-black bg-white p-3">
                {/* Name */}
                <div className="flex gap-5">
                  <p className="w-full max-w-[135px] font-medium">Name:</p>
                  <p>Beef and Broccoli Stir-Fry with Brown Rice</p>
                </div>
                {/*  */}
                {/* Description */}
                <div className="flex gap-5">
                  <p className="w-full max-w-[135px] font-medium">
                    Description:
                  </p>
                  <p>
                    This dish is a protein-packed, nutritious meal that is
                    perfect for a quick and easy dinner. Tender strips of beef
                    are stir-fried with broccoli and served over brown rice for
                    a delicious and filling meal.
                  </p>
                </div>
                {/*  */}
                {/* Ingredients */}
                <div className="flex gap-5">
                  <p className="w-full max-w-[135px] font-medium">
                    Ingredients:
                  </p>
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
                <div className="flex gap-5">
                  <p className="w-full max-w-[135px] font-medium">Calories:</p>
                  <p>501</p>
                </div>
                {/*  */}
                {/* Protein */}
                <div className="flex gap-5">
                  <p className="w-full max-w-[135px] font-medium">Protein:</p>
                  <p>53g</p>
                </div>
                {/*  */}
                {/* Fat */}
                <div className="flex gap-5">
                  <p className="w-full max-w-[135px] font-medium">Fat:</p>
                  <p>14g</p>
                </div>
                {/*  */}
                {/* Carbohydrates */}
                <div className="flex gap-5">
                  <p className="w-full max-w-[135px] font-medium">
                    Carbohydrates:
                  </p>
                  <p>38g</p>
                </div>
                {/*  */}
                {/* Preparation Time */}
                <div className="flex gap-5">
                  <p className="w-full max-w-[135px] font-medium">
                    Preparation Time:
                  </p>
                  <p>15 minutes</p>
                </div>
                {/*  */}
                {/* Cooking Time */}
                <div className="flex gap-5">
                  <p className="w-full max-w-[135px] font-medium">
                    Cooking Time:
                  </p>
                  <p>10 minutes</p>
                </div>
                {/*  */}
                {/* Instructions */}
                <div className="flex gap-5">
                  <p className="w-full max-w-[135px] font-medium">
                    Instructions:
                  </p>
                  <ol className="flex list-decimal flex-col gap-1 pl-5">
                    <li>
                      In a small bowl, whisk together the soy sauce, cornstarch,
                      sugar, salt, and black pepper.
                    </li>
                    <li>
                      In a large skillet or wok, heat the vegetable oil over
                      high heat.
                    </li>
                    <li>
                      Add the beef strips and stir-fry for 2-3 minutes, until
                      browned and cooked through.
                    </li>
                    <li>Remove the beef from the skillet and set aside.</li>
                    <li>
                      Add the broccoli, red bell pepper, onion, and garlic to
                      the skillet and stir-fry for 3-4 minutes, until the
                      vegetables are tender.
                    </li>
                    <li>
                      Add the beef back to the skillet and pour the soy sauce
                      mixture over everything. Stir-fry for an additional 1-2
                      minutes, until the sauce has thickened and everything is
                      coated.
                    </li>
                    <li>
                      Serve the beef and broccoli stir-fry over cooked brown
                      rice.
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
    </>
  );
};

export default DashboardPage;
