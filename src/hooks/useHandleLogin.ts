/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useMutation } from "@tanstack/react-query";
import type { NextRouter } from "next/router";

type Data = {
  email: string;
  password: string;
};

const useHandleLogin = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signIn: any,
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
      console.log({ status });
      if (status.error === "No user found with that email!") {
        setIsModal(true);
      } else if (status.ok) {
        if (status.ok && status.url) {
          await router.push(status.url);
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
