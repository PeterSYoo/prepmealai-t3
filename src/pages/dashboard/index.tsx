import { signOut, useSession } from "next-auth/react";
import { GenerateRecipeForm } from "~/components/dashboard/GenerateRecipeForm.components";
import { RecipeCard } from "~/components/dashboard/RecipeCard.components";
import { api } from "~/utils/api";

const DashboardPage = () => {
  const mutation = api.openai.postOpenai.useMutation();
  // session
  const { data: sessionData, status } = useSession();

  const handleOpenai = () => {
    const content = "What is 3+3?";

    mutation.mutate({ content });
  };

  console.log({ mutation });

  if (status === "loading") {
    return <>Fetching User Data..</>;
  }

  return (
    <>
      <p className="text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.email}</span>}
      </p>
      <button
        className="w-full border border-black bg-white/10 px-10 py-3 font-semibold transition hover:bg-[#6a6967] hover:text-white"
        onClick={() => void signOut()}
      >
        Sign Out
      </button>
      <button
        onClick={handleOpenai}
        className="w-full border border-black bg-white/10 px-10 py-3 font-semibold transition hover:bg-[#6a6967] hover:text-white"
      >
        OpenAi
      </button>
      <p className="text-center">
        {mutation.data?.data.choices[0].message.content}
      </p>
      <div className="grid grid-cols-[1.25fr_1fr] gap-[75px] bg-gradient-to-b from-[#abd1d9] to-[#ffffff] p-14">
        {/* Column 1 */}
        <div className="w-full">
          <h1 className="">Generate Recipes</h1>
          <div className="flex w-full flex-col border border-black px-5 py-10">
            {/* Generate Recipe Form */}
            <GenerateRecipeForm />
            {/*  */}
            {/* Results */}
            <div className="flex flex-col gap-3">
              <div>
                <div className="pt-6">Results:</div>
                <div className="mx-auto w-full border-b border-black"></div>
              </div>
              {/* Recipe Card */}
              <RecipeCard />
              {/*  */}
            </div>
            {/*  */}
          </div>
        </div>
        {/*  */}
        {/* Column 2 */}
        <div className="w-full">
          <h1 className="">Saved Recipes</h1>
          <div className="w-full border border-black">Test</div>
        </div>
        {/*  */}
      </div>
    </>
  );
};

export default DashboardPage;
