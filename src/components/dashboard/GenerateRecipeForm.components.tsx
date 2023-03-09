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
  meat: z.string(),
});

export const GenerateRecipeForm = () => {
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

  return (
    <>
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
    </>
  );
};
