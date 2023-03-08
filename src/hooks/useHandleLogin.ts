import { useMutation } from "@tanstack/react-query";

type Data = {
  email: string;
  password: string;
};

type SignIn = {
  redirect: boolean;
  email: string;
  password: string;
  callbackUrl: string;
};

const useHandleLogin = (
  signIn: (arg0: string, arg1: SignIn) => any,
  setIsModal: (arg0: boolean) => void,
  router: any
) => {
  const { mutateAsync, isLoading } = useMutation(async (data: any) => {
    try {
      const status = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "/dashboard",
      });
      console.log({ status });
      if (status.error === "No user found with that email!") {
        setIsModal(true);
      } else if (status.ok) {
        router.push(status.url);
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
