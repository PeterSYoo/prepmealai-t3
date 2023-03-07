import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
// import { env } from "~/env.mjs";

export const AuthProviders: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex w-full max-w-[400px] flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="w-full border border-black bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-[#6a6967] hover:text-white"
        onClick={
          sessionData ? () => void signOut() : () => void signIn("discord")
        }
      >
        {sessionData ? "Sign out" : "Discord Sign in"}
      </button>
      <button
        className="w-full border border-black bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-[#6a6967] hover:text-white"
        onClick={
          sessionData ? () => void signOut() : () => void signIn("google")
        }
      >
        {sessionData ? "Sign out" : "Google Sign in"}
      </button>
    </div>
  );
};
