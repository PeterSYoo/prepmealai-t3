import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiEyeCloseLine, RiEye2Line } from "react-icons/ri";
import { useState } from "react";
import useHandleLogin from "~/hooks/useHandleLogin";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { EmailDoesntExistModal } from "./EmailDoesntExistModal.components";

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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isEmailDoesntExistModal, setIsEmailDoesntExistModal] =
    useState<boolean>(false);

  // router
  const router = useRouter();

  // React Query
  const { mutateAsync, isLoading } = useHandleLogin(
    signIn,
    setIsEmailDoesntExistModal,
    router
  );

  // Use the useForm hook to handle the form state and validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  } = useForm<FormSchemaType>({ resolver: zodResolver(FormSchema) });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutateAsync({ email: data.email, password: data.password });
    reset;
  };

  return (
    <>
      {isEmailDoesntExistModal && (
        <EmailDoesntExistModal
          setIsEmailDoesntExistModal={setIsEmailDoesntExistModal}
        />
      )}
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-[400px] flex-col gap-4 px-5"
      >
        <h1 className="text-3xl font-bold">Login</h1>
        {/* Email */}
        <label className="-mb-2 flex flex-col gap-2 pt-4">
          <p className="font-medium">Email:</p>
          <input
            {...register("email")}
            placeholder="type here"
            type="text"
            className="w-full border border-black bg-[#FFF9F5] px-2 py-2 placeholder:text-[#aaa8a6] focus:outline-none"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </label>
        {/*  */}
        {/* Password */}
        <label className="flex flex-col gap-1">
          <p className="font-medium">Password:</p>
          <div className="flex w-full items-center border border-black bg-[#FFF9F5]">
            <input
              {...register("password")}
              placeholder="type here"
              type={showPassword ? "text" : "password"}
              className="h-full w-full bg-[#FFF9F5] py-3 px-2 placeholder:text-[#aaa8a6] focus:outline-none"
            />
            {showPassword ? (
              <RiEye2Line
                onClick={() => setShowPassword(false)}
                className="mx-3 cursor-pointer text-xl"
              />
            ) : (
              <RiEyeCloseLine
                onClick={() => setShowPassword(true)}
                className="mx-3 cursor-pointer text-xl"
              />
            )}
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </label>
        {/*  */}
        {/* Confirm Password */}
        <label className="flex flex-col gap-1">
          <p className="font-medium">Confirm Password:</p>
          <div className="flex w-full items-center border border-black bg-[#FFF9F5]">
            <input
              {...register("cpassword")}
              placeholder="type here"
              type={showPassword ? "text" : "password"}
              className="w-full bg-[#FFF9F5] px-2 py-2 placeholder:text-[#aaa8a6] focus:outline-none"
            />
            {showPassword ? (
              <RiEye2Line
                onClick={() => setShowPassword(false)}
                className="mx-3 cursor-pointer text-xl"
              />
            ) : (
              <RiEyeCloseLine
                onClick={() => setShowPassword(true)}
                className="mx-3 cursor-pointer text-xl"
              />
            )}
          </div>
          {errors.cpassword && (
            <p className="text-sm text-red-600">{errors.cpassword.message}</p>
          )}
        </label>
        {/*  */}
        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="rounded-md border border-black px-4 py-1 font-medium hover:bg-[#32383F] hover:text-white"
          >
            Submit
          </button>
        </div>
        {/*  */}
        <p className="pt-5 text-center">
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
