import { signIn, signOut, useSession } from "next-auth/react";

export const AuthProviders: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex w-full max-w-[400px] flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.email}</span>}
      </p>
      <button
        className="w-full border border-black bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-[#6a6967] hover:text-white"
        onClick={
          sessionData
            ? () => void signOut()
            : () =>
                void signIn("discord", {
                  callbackUrl: "/dashboard",
                })
        }
      >
        {sessionData ? "Sign out" : "Discord Sign in"}
      </button>
      <button
        className="w-full border border-black bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-[#6a6967] hover:text-white"
        onClick={
          sessionData
            ? () => void signOut()
            : () =>
                void signIn("google", {
                  callbackUrl: "/dashboard",
                })
        }
      >
        {sessionData ? "Sign out" : "Google Sign in"}
      </button>
    </div>
  );
};
