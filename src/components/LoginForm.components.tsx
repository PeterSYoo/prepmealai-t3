import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Inputs = {
  email: string;
  password: string;
  cpassword: string;
};

// Type for the form schema
type FormSchemaType = z.infer<typeof FormSchema>;
const FormSchema = z
  .object({
    email: z
      .string()
      .email("Email must be a valid email")
      .max(35, "Email must not be longer than 35 characters"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .min(1, "Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).*$/,
        "Password must contain at least one lowercase letter, one uppercase letter, one special character, and no spaces"
      ),
    cpassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .min(1, "Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).*$/,
        "Password must contain at least one lowercase letter, one uppercase letter, one special character, and no spaces"
      ),
  })
  .superRefine(({ cpassword, password }, ctx) => {
    if (cpassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["cpassword"],
      });
    }
  });

export const LoginForm = ({
  setIsLogin,
}: {
  setIsLogin: (isLogin: boolean) => void;
}) => {
  // Use the useForm hook to handle the form state and validation
  const {
    register,
    handleSubmit,
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
        className="flex w-full max-w-[400px] flex-col gap-4"
      >
        <h1 className="text-2xl font-bold">Login</h1>
        {/* Email */}
        <label className="flex flex-col gap-1">
          <p className="">Email:</p>
          <input
            {...register("email")}
            placeholder="type here"
            type="text"
            className="w-full bg-[#6a6967] px-2 py-2 text-white placeholder:text-[#aaa8a6] focus:outline-none"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </label>
        {/*  */}
        {/* Password */}
        <label className="flex flex-col gap-1">
          <p className="">Password:</p>
          <input
            {...register("password")}
            placeholder="type here"
            type="password"
            className="w-full bg-[#6a6967] px-2 py-2 text-white placeholder:text-[#aaa8a6] focus:outline-none"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </label>
        {/*  */}
        {/* Confirm Password */}
        <label className="flex flex-col gap-1">
          <p className="">Confirm Password:</p>
          <input
            {...register("cpassword")}
            placeholder="type here"
            type="password"
            className="w-full bg-[#6a6967] px-2 py-2 text-white placeholder:text-[#aaa8a6] focus:outline-none"
          />
          {errors.cpassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.cpassword.message}
            </p>
          )}
        </label>
        {/*  */}
        {/* Submit Button */}
        <div className="flex justify-end ">
          <button
            type="submit"
            className="border border-black px-2 py-1 hover:bg-[#6a6967] hover:text-white"
          >
            Submit
          </button>
        </div>
        {/*  */}
        <p className="text-center">
          If you don&apos;t have an account,&nbsp;
          <span
            className="cursor-pointer text-[#a06b2d] hover:text-black"
            onClick={() => setIsLogin(false)}
          >
            register here
          </span>
        </p>
      </form>
    </>
  );
};
