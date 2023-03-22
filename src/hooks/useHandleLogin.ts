import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import type { NextRouter } from "next/router";

type Data = {
  email: string;
  password: string;
};

const useHandleLogin = (
  setIsModal: (arg0: boolean) => void,
  router: NextRouter
) => {
  const { mutateAsync, isLoading } = useMutation(async (data: Data) => {
    try {
      const status = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "/recipe",
      });

      if (status) {
        console.log({ status });
        if (status.error === "No user found with that email!") {
          setIsModal(true);
        } else if (status.ok) {
          if (status.ok && status.url) {
            await router.push(status.url);
          }
        }
      }
    } catch (error) {
      return error;
    }
  });

  return {
    mutateAsync,
    isLoading,
  };
};

export default useHandleLogin;
