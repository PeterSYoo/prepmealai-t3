import * as z from "zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

type Inputs = {
  calories: string;
  protein: string;
  proteinChoice: string;
};

// Type for the form schema
type FormSchemaType = z.infer<typeof FormSchema>;
const FormSchema = z.object({
  calories: z
    .string()
    .regex(/^\d+$/, { message: "Calories must be a valid number." })
    .refine((value) => parseInt(value) >= 300 && parseInt(value) <= 1500, {
      message: "Calories must be between 300 and 1500 calories.",
    }),
  protein: z
    .string()
    .regex(/^\d+$/, { message: "Protein must be a valid number." })
    .refine((value) => parseInt(value) >= 5 && parseInt(value) <= 200, {
      message: "Protein must be between 5 and 200 grams.",
    }),
  proteinChoice: z.string(),
});

export const GenerateRecipeForm = ({
  handleGenerateRecipe,
  setIsForm,
}: {
  handleGenerateRecipe: (arg0: string, arg1: string, arg2: string) => void;
  setIsForm: (arg0: boolean) => void;
}) => {
  // States ------------------------------------------------------------- ***
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  } = useForm<FormSchemaType>({ resolver: zodResolver(FormSchema) });

  // Custom Functions ---------------------------------------------------- ***
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleGenerateRecipe(data.calories, data.protein, data.proteinChoice);
    setIsForm(false);
  };

  // JSX ------------------------------------------------------------------ ***
  return (
    <>
      <div className="w-full rounded-2xl bg-[#FFF9F5] shadow-[0_15px_20px_10px] shadow-black/50 md:mx-5 md:grid md:max-h-[691px] md:w-fit md:grid-cols-[1fr_1fr] md:shadow-[10px_15px_20px_10px] md:shadow-black/50">
        {/* Column 1 */}
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto flex w-full max-w-[500px] flex-col items-center justify-center gap-5 px-5 py-5"
        >
          {/* Title */}
          <h1 className="text-3xl font-bold">Generate a Recipe</h1>
          {/*  */}
          {/* Instructions */}
          <ul className="flex list-decimal flex-col gap-1 pl-8">
            <li className="">
              Determine your calorie and protein goals for the meal.
            </li>
            <li className="">
              Input your calorie and protein amount for the recipe.
            </li>
            <li className="">Choose a type of protein for the recipe.</li>
            <li className="">
              The AI algorithm will generate a random recipe based on your
              inputs.
            </li>
          </ul>
          {/*  */}
          {/* Calories */}
          <label className="w-full pt-2">
            <p className="">Calories:</p>
            <input
              {...register("calories")}
              placeholder="0"
              type="text"
              className="w-full border border-black p-1 focus:outline-none"
            />
            {errors.calories && (
              <p className="text-sm text-red-600">{errors.calories.message}</p>
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
              <p className="text-sm text-red-600">{errors.protein.message}</p>
            )}
          </label>
          {/*  */}
          {/* Type of Protein Choice */}
          <label className="w-full">
            <p className="">Type of Protein:</p>
            <select
              {...register("proteinChoice")}
              className="w-full border border-black p-1 focus:outline-none"
            >
              <option value="chicken">Chicken</option>
              <option value="beef">Beef</option>
              <option value="pork">Pork</option>
              <option value="turkey">Turkey</option>
              <option value="fish">Fish</option>
              <option value="egg">Egg</option>
              <option value="plant-based protein">Planet-Based Protein</option>
            </select>
          </label>
          {/*  */}
          {/* Submit Button */}
          <div className="flex w-full justify-end">
            <button
              type="submit"
              className="rounded-md border border-black bg-white px-4 py-1 font-semibold transition hover:bg-[#32383F] hover:text-white"
            >
              Submit
            </button>
          </div>
        </form>
        {/*  */}
        {/* Column 2 */}
        <div className="relative hidden h-[691px] w-[553px] md:block">
          <Image
            src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1678821553/PrepMeal%20AI/Generator/beechmore-books-0S2rRstB_9M-unsplash_1_qve6rr.png"
            alt="recipe book"
            fill
            className="rounded-r-2xl"
          />
        </div>
        {/*  */}
      </div>
    </>
  );
};
