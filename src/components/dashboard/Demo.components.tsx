import { Fragment, useEffect, useState } from "react";
import { api } from "~/utils/api";

export const Demo = () => {
  const [demoData, setDemoData] = useState<any>([]);
  const mutation = api.openai.postDemo.useMutation();
  const resultId = api.recipe.testRecipe.useQuery();

  const handleGenerateDemo = () => {
    const content = `
    Create a random JSON object for ingredients in a hot dog.
    Do not include any explanations, only provide a  RFC8259 compliant JSON response  following this format without deviation.
    [
      {
        "ingredients": ["ingredient 1", "ingredient 2", "ingredient 3", "etc"]
      }
    ]
    The JSON response:
    `;

    mutation.mutate({ content });
  };

  useEffect(() => {
    if (mutation.data?.data.choices[0]) {
      setDemoData(JSON.parse(mutation.data?.data.choices[0].message.content));
    }
  }, [mutation.data?.data.choices[0]]);

  return (
    <>
      <div className="px-14 pb-14">
        <div className="flex w-full flex-col border border-black px-5 py-10">
          <p className="">{resultId.data?.message}</p>
          <button
            className="w-full border border-black bg-white/10 px-10 py-3 font-semibold transition hover:bg-[#6a6967] hover:text-white"
            onClick={handleGenerateDemo}
          >
            Generate Demo
          </button>
          <h1 className="pt-5">Demo:</h1>
          <ol className="list-decimal px-10">
            {demoData[0]?.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};
