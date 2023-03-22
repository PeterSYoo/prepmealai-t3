import { useMutation } from "@tanstack/react-query";
import { env } from "~/env.mjs";
import { z } from "zod";

type ChatCompletion = {
  id: string;
  object: "chat.completion";
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: [
    {
      message: Record<string, unknown>;
      finish_reason: "stop";
      index: number;
    }
  ];
};

// Define the schema for the expected JSON format
const recipeSchema = z.array(
  z.object({
    name: z.string(),
    dishType: z.string(),
    proteinChoice: z.string(),
    description: z.string(),
    ingredients: z.array(z.string()),
    calories: z.string(),
    protein: z.string(),
    fat: z.string(),
    carb: z.string(),
    prepTime: z.string(),
    cookingTime: z.string(),
    instructions: z.array(z.string()),
  })
);

const useFetchOpenAi = () => {
  // useMutation ------------------
  const { mutateAsync, isLoading, data, status } = useMutation(
    async (content: string) => {
      console.log({ content });

      try {
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${env.NEXT_PUBLIC_OPENAI_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "user",
                  content,
                },
              ],
            }),
          }
        );

        try {
          const data: ChatCompletion =
            (await response.json()) as ChatCompletion;
          console.log({ data });
          // Check if the data matches the expected format
          const parsedData = (await JSON.parse(
            data.choices[0].message.content as string
          )) as Record<string, unknown>;
          recipeSchema.parse(parsedData);
          return {
            success: true,
            message: "OpenAI generated a recipe in JSON format.",
            data,
          };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            message:
              "OpenAI generated data that does not match the expected format.",
            data: null,
          };
        }
      } catch (error) {
        console.log(error);
      }
    }
  );

  return { mutateAsync, isLoading, data, status };
};

export default useFetchOpenAi;
