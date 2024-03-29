import { signIn, signOut, useSession } from "next-auth/react";

export const AuthProviders: React.FC = () => {
  // States ------------------------------------------------------------- ***
  const { data: sessionData } = useSession();

  // JSX ------------------------------------------------------------------ ***
  return (
    <div className="flex w-full max-w-[400px] flex-col items-center justify-center gap-5 px-5 pt-3">
      <button
        className="w-full rounded-lg border border-black bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-[#32383F] hover:text-white"
        onClick={
          sessionData
            ? () => void signOut()
            : () =>
                void signIn("discord", {
                  callbackUrl: "/recipe",
                })
        }
      >
        Discord Sign in
      </button>
      <button
        className="w-full rounded-lg border border-black bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-[#32383F] hover:text-white"
        onClick={
          sessionData
            ? () => void signOut()
            : () =>
                void signIn("google", {
                  callbackUrl: "/recipe",
                })
        }
      >
        Google Sign in
      </button>
    </div>
  );
};
